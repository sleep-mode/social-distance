import { Socket } from 'socket.io';
import { clientManager } from '../client';
import { startLoop } from './loop';

export class GameServer {
  start() {
    startLoop();
  }

  onConnect(socket: Socket) {
    console.log('Client', socket.id, 'connected!');
    console.log('Total:', clientManager.count());
    clientManager.add(socket);
  }

  /**
   * Client Action Handler
   */
  onMessage(action: string, params: Record<string, string> & { clientId: string }) {
    console.log('Server received');
    console.log('Action:', action, 'Params:', params);
    switch (action) {
      case 'playerDirection': {
        const player = clientManager.getPlayerById(params.clientId);
        if (player) {
          player.changeDirection();
        }
        break;
      }
    }
  }

  onDisconnect(socketId: string) {
    clientManager.remove(socketId);
  }
}
