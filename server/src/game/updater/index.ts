import { GameState } from '../GameState';
import { Server } from 'socket.io';
import { config } from '../../config';
import { createCoin } from '../entity/Coin';
import { PlayerObject } from '../entity/Player';
import { PlayerType } from '../model/Player';
import { Coin } from '../model/Coin';
import { Connections } from '../Connections';

const MAX_COIN_COUNT = 30;

/**
 * 플레이어 위치 업데이트
 */
export function updatePlayerLocation(state: GameState) {
  return (delta: number) => {
    Object.values(state.players).forEach(player => {
      player.update(delta);
    });
  };
}

/**
 * 충돌처리
 */
export function updatePersonCollision(state: GameState) {
  return () => {
    const players = Object.values(state.players).sort((a, b) => a.x - b.x);

    /** HP 감소 */
    const playersToBeDamaged: PlayerObject[] = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.mask) continue;
      if (player.type === PlayerType.ALIVE) {
        for (let j = Math.max(i - 2, 0); j < i + 2; j++) {
          const other = players[j];
          if (other == null) {
            continue;
          }
          let count = 0;
          if (Math.abs(other.x - player.x) < 50) {
            if (other.type === PlayerType.ZOMBIE) {
              count += 5;
            } else {
              count++;
            }

            if (count >= 5) {
              playersToBeDamaged.push(player);
            }
          }
        }
      }

      /** default hp decresing */
      /** Zombie loose more */
      // player.hp -= player.type === PlayerType.ALIVE ? 2 : 5;
      player.hp -= player.type === PlayerType.ALIVE ? 0.3 : 0.5;
    }

    for (const player of playersToBeDamaged) {
      player.hp -= 2;
    }
  };
}

export function updateCoinCollision(state: GameState) {
  return () => {
    /** 코인 줍줍 */
    for (const coin of state.coins) {
      for (const player of Object.values(state.players)) {
        if (player.type !== PlayerType.ALIVE) {
          continue;
        }

        if (Math.abs(coin.x - player.x) < 30) {
          state.coins.delete(coin);
          player.coin += coin.amount;
        }
      }
    }
  };
}

export function updatePlayerState(state: GameState, connections: Connections) {
  return () => {
    for (const player of Object.values(state.players)) {
      if (player.hp > 0) {
        continue;
      }

      if (player.type === PlayerType.ALIVE) {
        player.type = PlayerType.ZOMBIE;
        player.hp = 100;
      } else if (player.type === PlayerType.ZOMBIE) {
        player.type = PlayerType.DEAD;
        connections.getSocketById(player.socketId)?.send('DEAD');
      }
    }
  };
}

/**
 * 코인생성
 */
export function updateCoinGeneration(state: GameState) {
  return () => {
    if (shouldGenerateCoin(state)) {
      generateCoins(state).forEach(coin => state.coins.add(coin));
    }
  };
}

/**
 * 모든 클라이언트 상태 싱크 전송
 */
export function broadcastState(state: GameState, io: Server) {
  return () => {
    io.to(config.roomName).emit('message', 'SYNC', state.serialize());
  };
}

/**
 * 코인 생성 시각 확인
 */
function shouldGenerateCoin(state: GameState) {
  const now = Date.now();
  if (now - state.lastCoinGeneratedAt > 8000) {
    state.lastCoinGeneratedAt = now;
    return true;
  } else {
    return false;
  }
}

/**
 * 새 코인 생성
 */
function generateCoins(state: GameState): Coin[] {
  if (state.coins.size > MAX_COIN_COUNT) {
    return [];
  }

  const COIN_GENERATION_COUNT = Object.keys(state.players).length * 2 + 4;
  const coins: Coin[] = [];

  for (let i = 0; i < COIN_GENERATION_COUNT; i++) {
    coins.push(createCoin(config.mapWidth * Math.random(), Math.random() > 0.8 ? 5 : 1));
  }

  return coins;
}
