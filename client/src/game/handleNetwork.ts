import { Socket } from 'socket.io-client';
import { ctx } from './context';
import { Game } from './game';

export function handleNetwork(socket: Socket, game: Game, name: string, endGame: (end: boolean) => void, characterIndex?: number) {
  socket.on('connect', function () {
    ctx.clientId = socket.id;
    /** Send를 보내야 서버에서 캐릭터를 생성 */
    socket.send('READY', { name, characterIndex });

    socket.on('message', function (event: string, params: Record<string, any>) {
      if (event === 'SYNC') {
        game.syncPlayers(params.players);
        game.syncCoins(params.coins);
      }
      if (event === 'DEAD') {
        endGame(true);
      }
    });

    socket.on('close', function () {});
  });
}
