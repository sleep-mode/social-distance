import { clientManager } from '../client';
import { startLoop } from './loop';

export class GameServer {
  start() {
    startLoop(60);
  }

  onConnect(id: string) {
    console.log('Client', id, 'connected!');
    console.log('Total:', clientManager.count());

    // Send welcome message
    const client = clientManager.get(id);
    if (client) {
      client.data().player = {
        x: 10,
        y: 50,
        direction: 1,
      };
      client.emit('welcome', {
        id: id,
        players: clientManager.allData(),
      });
      client.broadcast('playerJoin', {
        players: clientManager.allData(),
      });
    }
  }

  /**
   * Client Action Handler
   */
  onMessage(action: string, params: Record<string, string> & { clientId: string }) {
    console.log('Server received');
    console.log('Action:', action, 'Params:', params);
    switch (action) {
      case 'playerDirection': {
        const client = clientManager.get(params.clientId);
        if (client) {
          client.data().player.direction = params.clientId;
          client.broadcast('updatePlayerDirection', {
            player: params.clientId,
            x: client.data().player.x,
            y: client.data().player.y,
            direction: client.data().player.direction,
          });
        }
        break;
      }
    }
  }

  onDisconnect(id: string) {
    const client = clientManager.get(id);
    if (client) {
      client.broadcast('playerDisconnect', {
        player: id,
      });
      console.log('Client', id, 'disconnected!');
      console.log('Total:', clientManager.count());
    }
  }
}
