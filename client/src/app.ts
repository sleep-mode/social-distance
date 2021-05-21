// import eio from 'engine.io-client';
import { io } from 'socket.io-client';
import { Game } from './game';
import { BufferUtil } from './utils/buffer-until';
import { ctx } from './context';

//

//Define animation frame
const requestAnimFrame = (function () {
  return (
    (window as any).requestAnimationFrame ||
    (window as any).webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    function (callback) {
      (window as any).setTimeout(callback, 1000 / 60);
    }
  );
})();

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

const c: any = (document as any).getElementById('cvs');
const canvas: any = c.getContext('2d');
const ratio: any = PIXEL_RATIO;
c.width = screenWidth * ratio;
c.height = screenHeight * ratio;
c.style.width = screenWidth + 'px';
c.style.height = screenHeight + 'px';
c.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);

const KEY_ENTER = 13;

const tickLengthMs = 1000 / 60;
let previousTick = Date.now();
let actualTicks = 0;

//

const game = new Game();

//

function startGame() {
  console.log('start game');
  (document as any).getElementById('gameAreaWrapper').style.display = 'block';
  (document as any).getElementById('startMenuWrapper').style.display = 'none';

  ctx.playerName = ctx.playerNameInput.value.replace(/(<([^>]+)>)/ig, '');

  //Set up socket
  const socket = io('http://localhost:5000', { transports: ['websocket'] });
  ctx.socket = socket;

  game.handleNetwork(socket);

  //Start loop
  windowLoop();
}

function windowLoop() {
  requestAnimFrame(windowLoop);
  gameLoop();
}

function gameLoop() {
  const now = Date.now();
  actualTicks++;
  game.handleGraphics(canvas);
  if (previousTick + tickLengthMs <= now) {
    const delta = (now - previousTick) / 1000;
    previousTick = now;
    game.handleLogic(delta);
    actualTicks = 0;
  }
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
