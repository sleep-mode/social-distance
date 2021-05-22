import { Socket } from 'socket.io-client';
import { ctx } from './context';
import { Game } from './game';
import { BufferUtil } from './utils/buffer-until';

export function handleNetwork(socket: Socket, game: Game) {
  //Network callback
  console.log('HandleNetwork!');

  socket.on('connect', function () {
    ctx.clientId = socket.id;

    socket.on('message', function (data) {
      const msg: any = JSON.parse(BufferUtil().toString(data));
      if (msg.players) {
        game.players = msg.players;
        game.draw();
      }
    });
    socket.on('close', function () {});
  });
}
