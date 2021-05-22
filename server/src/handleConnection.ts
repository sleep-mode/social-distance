import { Socket, Server } from 'socket.io';
import { clientManager } from './client';
import { GameServer } from './game/GameServer';

export function handleConnection(io: Server, gameServer: GameServer) {
  io.on('connection', function (socket: Socket) {
    console.log(`[connect]: ${socket.id}`);
    if (!clientManager.exist(socket.id)) {
      clientManager.add(socket);
    }
    gameServer.onConnect(socket);

    socket.on('message', function (data) {
      const stringified = data.toString('utf-8').replace(/\0/g, ''); //Take \0 ending character into account
      const req = JSON.parse(stringified);
      gameServer.onMessage(socket.id, req.action, req.params);
    });

    socket.on('disconnect', function () {
      console.log(`[disconnect]: ${socket.id}`);
      if (clientManager.exist(socket.id)) {
        gameServer.onDisconnect(socket.id);
        clientManager.remove(socket.id);
      }
    });
  });
}
