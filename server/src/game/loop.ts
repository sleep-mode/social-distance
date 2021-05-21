import { clientManager } from '../client';
import { update } from './update';
import { config } from '../config';

/**
 * Main server logic - handle everything game-related here
 */
export function startLoop() {
  /**
    Length of a tick in milliseconds. The denominator is your desired framerate.
    e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
    */
  const tickLengthMs = 1000 / config.frameRate;

  /* gameLoop related letiables */
  // timestamp of each loop
  let previousTick = Date.now();
  // number of times gameLoop gets called

  function loop() {
    const now = Date.now();

    if (previousTick + tickLengthMs <= now) {
      const delta = (now - previousTick) / 1000;
      previousTick = now;

      /**
       *  Update is normally where all of the logic would go. In this case we simply call
       *  a function that takes 10 milliseconds to complete thus simulating that our game
       *  had a very busy time.
       */
      update(delta);
      clientManager.broadcast();
    }

    if (Date.now() - previousTick < tickLengthMs - 16) {
      setTimeout(loop);
    } else {
      setImmediate(loop);
    }
  }

  loop();
}
