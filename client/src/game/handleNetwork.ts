import { Socket } from 'socket.io-client';
import { ctx } from './context';
import { Game } from './game';

export function handleNetwork(socket: Socket, game: Game) {
  //Network callback
  console.log('HandleNetwork!');

  socket.on('connect', function () {
    ctx.clientId = socket.id;
    /** Send를 보내야 서버에서 캐릭터를 생성 */
    socket.send('READY', { name: 'foo' });

    socket.on('message', function (event: string, params: Record<string, any>) {
      if (event === 'SYNC') {
        game.syncPlayers(params.players);
        game.syncCoins(params.coins);
      }
    });

    socket.on('close', function () {});
  });
}
