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

const c: HTMLCanvasElement = (document as any).getElementById('cvs');
const canvas = c.getContext('2d')!;
const ratio: any = PIXEL_RATIO;
c.width = screenWidth * ratio;
c.height = screenHeight * ratio;
c.style.width = screenWidth + 'px';
c.style.height = screenHeight + 'px';
canvas.setTransform(ratio, 0, 0, ratio, 0, 0);

const KEY_ENTER = 13;

//

const game = new Game(canvas);
//

function startGame() {
  console.log('start game');
  (document as any).getElementById('gameAreaWrapper').style.display = 'block';
  (document as any).getElementById('startMenuWrapper').style.display = 'none';

  ctx.playerName = ctx.playerNameInput.value.replace(/(<([^>]+)>)/gi, '');

  //Set up socket
  const socket = io(ctx.serverInput.value, { transports: ['websocket'] });
  ctx.socket = socket;

  handleNetwork(socket, game);
  game.start();

  //Start loop
  // windowLoop();
}

//Check nick and start game
function checkNick() {
  if (validNick()) {
    startGame();
  } else {
    ctx.nickErrorText.style.display = 'inline';
  }
}

//Check if nick is alphanumeric
function validNick() {
  const regex = /^\w*$/;
  console.log('Regex Test', regex.exec(ctx.playerNameInput.value));
  return regex.exec(ctx.playerNameInput.value) !== null;
}

//Set up form
(window as any).onload = function () {
  'use strict';

  ctx.btn = (document as any).getElementById('startButton');
  ctx.nickErrorText = (document as any).querySelector('#startMenu .input-error');
  ctx.playerNameInput = (document as any).getElementById('playerNameInput');
  ctx.serverInput = (document as any).getElementById('serverInput');

  ctx.btn.onclick = checkNick; //Check nick on click

  ctx.playerNameInput.addEventListener('keypress', function (e) {
    const key = e.which || e.keyCode;

    if (key === KEY_ENTER) {
      checkNick();
    }
  });
};

//Resize event
(window as any).addEventListener(
  'resize',
  function () {
    screenWidth = (window as any).innerWidth;
    screenHeight = (window as any).innerHeight;
    c.width = screenWidth;
    c.height = screenHeight;
  },
  true
);
