// import eio from 'engine.io-client';
import { io } from 'socket.io-client';
import { Game } from './game';
import { ctx } from './context';
import { handleNetwork } from './handleNetwork';
import { Canvas } from './canvas';

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
  let canvasObj: Canvas;
  const canvas = c.getContext('2d')!;

  const ratio: any = PIXEL_RATIO;
  c.width = screenWidth * ratio;
  c.height = (screenHeight * ratio) * (3 / 4);

  // c.style.width = screenWidth + 'px';
  // c.style.height = screenHeight + 'px';

  canvas.setTransform(ratio, 0, 0, ratio, 0, 0);
  canvasObj = {
    context: canvas,
    viewPort: 0,
    width: c.width / ratio,
    height: c.height / ratio,
  };
  return canvasObj;
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
}
