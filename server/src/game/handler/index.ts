import { Connections } from '../Connections';
import { GameState } from '../GameState';
import { Server } from 'socket.io';
import { PlayerObject } from '../entity/Player';
import { PlayerType, Character } from '../model/Player';
import { config } from '../../config';

/* ---------------------------------------------------------- *
 *
 *  TODO: move to other file
 *
 * ---------------------------------------------------------- */
interface Dependencies {
  connections: Connections;
  state: GameState;
  io: Server;
}

interface ClientEvent {
  action: string;
  params: Record<string, any>;
  socketId: string;
}

/**
 * 클라이언트로부터 오는 메시지 처리
 */
export function handleMessage({ state }: Dependencies, { action, params, socketId }: ClientEvent) {
  if (action === 'READY') {
    const player = new PlayerObject(
      socketId,
      params.name ?? '',
      Math.random() * config.mapWidth,
      0,
      100,
      false,
      0,
      PlayerType.ALIVE,
      params.characterIndex ?? pickRandomCharacter(),
      1
    );

    state.players[socketId] = player;
  }

  if (action === 'CHANGE_DIRECTION') {
    const player = state.players[socketId];
    player.changeDirection();
  }

  if (action === 'MASK') {
    const player = state.players[socketId];
    if (player.mask === false && player.coin >= 10) {
      player.coin -= 10;
      player.mask = true;
      setTimeout(() => {
        player.mask = false;
      }, 5000);
    }
  }

  if (action === 'HEAL') {
    const player = state.players[socketId];
    if (player.coin >= 15) {
      player.coin -= 15;
      player.hp = 100;
    }
  }

  if (action === 'RESTART') {
    const original = state.players[socketId];
    const player = new PlayerObject(
      socketId,
      original?.nickname ?? '',
      Math.random() * config.mapWidth,
      0,
      100,
      false,
      0,
      PlayerType.ALIVE,
      original?.character ?? pickRandomCharacter(),
      1
    );

    delete state.players[socketId];
    state.players[socketId] = player;
  }
}

function pickRandomCharacter() {
  return Math.floor(Math.random() * 6) as Character;
}
