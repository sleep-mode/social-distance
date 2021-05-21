import { Socket, Server } from 'socket.io';
import { clientManager } from './client';

export function handleConnection(io: Server, gameServer: any) {
  io.on('connection', function (socket: Socket) {
    console.log('Connection received');
    if (!clientManager.get(socket.id)) {
      clientManager.add(socket);
    }
    gameServer.connection(socket.id);

    socket.on('message', function (data) {
      console.log('on message');
      const stringified = data.toString('utf-8').replace(/\0/g, ''); //Take \0 ending character into account
      const req = JSON.parse(stringified);
      gameServer.on(req.event, req.message);
    });

    socket.on('disconnect', function () {
      console.log('on close');
      if (clientManager.get(socket.id)) {
        gameServer.disconnect(socket.id);
        clientManager.remove(socket.id);
      }
    });
  });
}
