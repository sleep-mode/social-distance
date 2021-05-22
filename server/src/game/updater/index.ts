import { GameState } from '../GameState';
import { Server } from 'socket.io';
import { config } from '../../config';
import { Coin } from '../entity/Coin';

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
export function updateCollision(state: GameState) {
  return () => {
    //
  };
}

/**
 * 코인생성
 */
export function updateCoinGeneration(state: GameState) {
  return () => {
    if (shouldGenerateCoin(state)) {
      state.coins.push(...generateCoins(state));
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
  if (now - state.lastCoinGeneratedAt > 3000) {
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
  if (state.coins.length > MAX_COIN_COUNT) {
    return [];
  }

  const COIN_GENERATION_COUNT = 3;
  const coins: Coin[] = [];

  for (let i = 0; i < COIN_GENERATION_COUNT; i++) {
    coins.push({
      amount: 1,
      x: config.mapWidth * Math.random(),
    });
  }

  return coins;
}
