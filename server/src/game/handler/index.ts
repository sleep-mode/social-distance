import { Connections } from '../Connections';
import { GameState } from '../GameState';
import { Server } from 'socket.io';
import { Player } from '../entity/Player';

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
  params: Record<string, string>;
  socketId: string;
}

/**
 * 클라이언트로부터 오는 메시지 처리
 */
export function handleMessage({ state }: Dependencies, { action, params, socketId }: ClientEvent) {
  if (action === 'READY') {
    const player = new Player({
      socketId,
      coin: 0,
      nickname: params.name ?? '',
      x: 0,
      y: 0,
    });

    state.players[socketId] = player;
  }

  if (action === 'CHANGE_DIRECTION') {
    const player = state.players[socketId];
    player.changeDirection();
  }
}
