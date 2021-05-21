import { Socket } from 'socket.io';
import { ctx } from './context';

class ClientManager {
  add(socket: Socket) {
    ctx.SOCKET_CLIENTS[socket.id] = socket;
    ctx.CLIENT_DATA[socket.id] = {};
  }

  remove(socketId: string) {
    delete ctx.SOCKET_CLIENTS[socketId];
    delete ctx.CLIENT_DATA[socketId];
  }

  count() {
    return Object.keys(ctx.SOCKET_CLIENTS).length;
  }

  all() {
    return Object.keys(ctx.SOCKET_CLIENTS);
  }

  allData() {
    return ctx.CLIENT_DATA;
  }

  get(socketId: string) {
    if (!ctx.SOCKET_CLIENTS[socketId]) return null;

    return {
      data: function () {
        return ctx.CLIENT_DATA[socketId];
      },
      emit: function (eventName, data) {
        if (ctx.SOCKET_CLIENTS[socketId]) {
          ctx.SOCKET_CLIENTS[socketId].send(Buffer.from(JSON.stringify({ event: eventName, message: data })));
        }
      },
      broadcast: function (eventName, data) {
        Object.keys(ctx.SOCKET_CLIENTS).map(function (cid) {
          if (cid != socketId) {
            ctx.SOCKET_CLIENTS[cid].send(Buffer.from(JSON.stringify({ event: eventName, message: data })));
          }
        });
      },
    };
  }
}

export const clientManager = new ClientManager();
