import { clientManager } from '../client';
import { startLoop } from './loop';

const createGameServer = function () {
  startLoop(60);

  return {
    connection: function (id) {
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
    },
    on: function (event, msg) {
      console.log('Server received');
      console.log('Event:', event, 'Message:', msg);
      switch (event) {
        case 'playerDirection': {
          const client = clientManager.get(msg.clientId);
          if (client) {
            client.data().player.direction = msg.direction;
            client.broadcast('updatePlayerDirection', {
              player: msg.clientId,
              x: client.data().player.x,
              y: client.data().player.y,
              direction: client.data().player.direction,
            });
          }
          break;
        }
      }
    },
    disconnect: function (id) {
      const client = clientManager.get(id);
      if (client) {
        client.broadcast('playerDisconnect', {
          player: id,
        });
        console.log('Client', id, 'disconnected!');
        console.log('Total:', clientManager.count());
      }
    },
  };
};

export default createGameServer;
