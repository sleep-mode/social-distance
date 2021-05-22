// import eio from 'engine.io-client';
import { io } from 'socket.io-client';
import { Game } from './game';
import { ctx } from './context';
import { handleNetwork } from './handleNetwork';

let screenWidth = (window as any).innerWidth;
let screenHeight = (window as any).innerHeight;

const PIXEL_RATIO = (function () {
  const ctx = (document as any).createElement('canvas').getContext('2d')!;
  const dpr = (window as any).devicePixelRatio || 1;
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;

  return dpr / bsr;
})();

function prepare() {
  const c: HTMLCanvasElement = (document as any).getElementById('cvs');
  if (c == null) {
    alert('No canvas found. retry');
    return;
  }
  const canvas = c.getContext('2d')!;

  const ratio: any = PIXEL_RATIO;
  c.width = screenWidth * ratio;
  c.height = (screenHeight * ratio) / 2;

  // c.style.width = screenWidth + 'px';
  // c.style.height = screenHeight + 'px';

  canvas.setTransform(ratio, 0, 0, ratio, 0, 0);
  return canvas;
}

export function startGame(name: string, host: string, port: string) {
  const canvas = prepare();
  if (canvas == null) {
    return;
  }

  const game = new Game(canvas);
  console.log('start game');

  ctx.playerName = name;

  //Set up socket
  const socket = io(`http://${host}:${port}`, { transports: ['websocket'] });
  ctx.socket = socket;

  handleNetwork(socket, game);
  game.start();

  //Start loop
  // windowLoop();
}

//Check nick and start game
// function checkNick() {
//   if (validNick()) {
//     startGame();
//   } else {
//     ctx.nickErrorText.style.display = 'inline';
//   }
// }

//Check if nick is alphanumeric
// function validNick() {
//   const regex = /^\w*$/;
//   console.log('Regex Test', regex.exec(ctx.playerNameInput.value));
//   return regex.exec(ctx.playerNameInput.value) !== null;
// }
