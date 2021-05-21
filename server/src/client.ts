import { Socket } from 'socket.io';
import { ctx } from './context';
import { Player } from './game/Player';

class ClientManager {
  add(socket: Socket) {
    ctx.sockets[socket.id] = socket;
    ctx.players[socket.id] = new Player({
      socketId: socket.id,
      nickname: 'foo',
      coin: 0,
      x: 30,
      y: 300,
    });
  }

  getPlayers() {
    return Object.values(ctx.players);
  }

  remove(socketId: string) {
    delete ctx.sockets[socketId];
    delete ctx.players[socketId];
  }

  count() {
    return Object.keys(ctx.sockets).length;
  }

  exist(socketId: string) {
    return ctx.players[socketId] !== undefined;
  }

  all() {
    return Object.keys(ctx.sockets);
  }

  allData() {
    return ctx.players;
  }

  getPlayerById(socketId: string) {
    return ctx.players[socketId];
  }

  broadcast() {
    const state = serializeState(Object.values(ctx.players));

    for (const socket of Object.values(ctx.sockets)) {
      socket.send(state);
    }
  }
}

export const clientManager = new ClientManager();

function serializeState(players: Player[]) {
  return Buffer.from(
    JSON.stringify({
      players,
    })
  );
}
