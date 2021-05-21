import { Socket } from 'socket.io-client';
import { ctx } from './context';
import { Game } from './game';
import { BufferUtil } from './utils/buffer-until';

export function handleNetwork(socket: Socket, game: Game) {
  //Network callback
  console.log('HandleNetwork!');

  socket.on('connect', function () {
    console.log('on - open');

    socket.on('message', function (data) {
      console.log('on-message', data);

      const msg = JSON.parse(BufferUtil().toString(data));
      console.log(msg);
      if (msg.event == 'welcome') {
        ctx.clientId = msg.message.id;
        game.updatePlayerList(msg.message.players);
        console.log('All players', this.players);
      }
      if (msg.event == 'playerJoin') {
        game.updatePlayerList(msg.message.players);
        console.log('New player joined', this.players);
      }
      if (msg.event == 'updatePlayerDirection') {
        game.players[msg.message.player] = {
          x: msg.message.x,
          y: msg.message.y,
          direction: msg.message.direction,
        };
      }
      if (msg.event == 'playerDisconnect') {
        delete game.players[msg.message.player];
      }
    });
    socket.on('close', function () {});
  });
}
