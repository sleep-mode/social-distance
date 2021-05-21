import Client from './client';

/*
   Main server logic - handle everything game-related here
   */

const GameLoop = function (fn, frameRate) {
  /**
    Length of a tick in milliseconds. The denominator is your desired framerate.
    e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
    */
  const tickLengthMs = 1000 / frameRate;

  /* gameLoop related letiables */
  // timestamp of each loop
  let previousTick = Date.now();
  // number of times gameLoop gets called
  let actualTicks = 0;

  const gameLoop = function () {
    const now = Date.now();

    actualTicks++;
    if (previousTick + tickLengthMs <= now) {
      const delta = (now - previousTick) / 1000;
      previousTick = now;

      update(delta);

      actualTicks = 0;
    }

    if (Date.now() - previousTick < tickLengthMs - 16) {
      setTimeout(gameLoop);
    } else {
      setImmediate(gameLoop);
    }
  };

  /**
    Update is normally where all of the logic would go. In this case we simply call
    a function that takes 10 milliseconds to complete thus simulating that our game
    had a very busy time.
    */
  const update = function (delta) {
    fn(delta);
  };

  return {
    start: function () {
      // begin the loop !
      gameLoop();
    },
  };
};

const createGameServer = function () {
  const mainLoop = function (delta) {
    const ids = Client().all();
    for (let i = 0; i < Client().count(); i++) {
      const client = Client().get(ids[i]);
      if (client) {
        const data = Client().get(ids[i])!.data();
        data.player.x += data.player.direction * 300 * delta;
        if (data.player.direction > 0 && data.player.x > 1000) {
          data.player.x = data.player.x % 1000;
        }
        if (data.player.direction < 0 && data.player.x < 0) {
          data.player.x = 1000;
        }
      }
    }
  };

  GameLoop(mainLoop, 60).start();

  return {
    connection: function (id) {
      console.log('Client', id, 'connected!');
      console.log('Total:', Client().count());

      // Send welcome message
      const client = Client().get(id);
      if (client) {
        client.data().player = {
          x: 10,
          y: 500,
          direction: 1,
        };
        client.emit('welcome', {
          id: id,
          players: Client().allData(),
        });
        client.broadcast('playerJoin', {
          players: Client().allData(),
        });
      }
    },
    on: function (event, msg) {
      console.log('Server received');
      console.log('Event:', event, 'Message:', msg);
      switch (event) {
        case 'playerDirection': {
          const client = Client().get(msg.clientId);
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
      const client = Client().get(id);
      if (client) {
        client.broadcast('playerDisconnect', {
          player: id,
        });
        console.log('Client', id, 'disconnected!');
        console.log('Total:', Client().count());
      }
    },
  };
};

export default createGameServer;
