// import eio from 'engine.io-client';
import { io } from 'socket.io-client';
import { Game } from './game';
import { ctx } from './context';
import { handleNetwork } from './handleNetwork';
import { Canvas } from './canvas';
import { playBGM } from './utils/audio';

let screenWidth = (window as any).innerWidth;
let screenHeight = (window as any).innerHeight;

function prepare(id: string) {
  const c: HTMLCanvasElement = (document as any).getElementById(id);
  if (c == null) {
    alert('No canvas found. retry');
    return;
  }
  let canvasObj: Canvas;
  const canvas = c.getContext('2d')!;

  const ratio: any = 800 / screenHeight;
  c.width = screenWidth * ratio;
  c.height = screenHeight * ratio;

  window.addEventListener('resize', function(event) {
    let screenWidth = (window as any).innerWidth;
    let screenHeight = (window as any).innerHeight;
    let ratio: any = 800 / screenHeight;
    c.width = screenWidth * ratio;
    c.height = screenHeight * ratio;
    canvasObj.width = c.width;
    canvasObj.height = c.height;
  });

  canvasObj = {
    context: canvas,
    viewPort: 0,
    width: c.width,
    height: c.height,
  };
  return canvasObj;
}

export function startGame(name: string, host: string, port: string) {
  const canvas = prepare('cvs');
  const objectCanvas = prepare('ocvs');
  if (canvas == null || objectCanvas == null) {
    return;
  }

  const game = new Game(canvas, objectCanvas);
  console.log('start game');
  playBGM();

  ctx.playerName = name;

  //Set up socket
  const socket = io(`http://${host}:${port}`, { transports: ['websocket'] });
  ctx.socket = socket;

  handleNetwork(socket, game);
  game.start();
}
