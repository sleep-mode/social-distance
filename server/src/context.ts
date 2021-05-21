import { Socket } from 'socket.io';
import { Player } from './game/Player';

export interface Context {
  sockets: Record<string, Socket>;
  players: Record<string, Player>;
}

export const ctx: Context = {
  sockets: {},
  players: {},
};
