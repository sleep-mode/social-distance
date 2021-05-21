import { BufferUtil } from './utils/buffer-until';
import { ctx } from './context';
import { emit } from './emit';
import { Socket } from 'socket.io-client';
import BackgroundImage from "../img/bg.png";

export function Game() {
  const self = this;
  self.players = {};
  addEventListener('keydown', self.handleKeyboard.bind(self));
}

Game.prototype.handleKeyboard = function (event) {
  const self = this;
  console.log('gotcha');
  if ((event.keyCode || event.which) == 16) {
    if (self.players[ctx.clientId]) {
      self.players[ctx.clientId].direction *= -1;
      emit('playerDirection', {
        clientId: ctx.clientId,
        direction: self.players[ctx.clientId].direction,
      });
    }
  }
};

Game.prototype.updatePlayerList = function (playersData) {
  const self = this;
  const players = Object.keys(playersData);
  for (let i = 0; i < players.length; i++) {
    const pid = players[i];
    self.players[pid] = playersData[pid].player;
  }
};

Game.prototype.handleNetwork = function (socket: Socket) {
  const self = this;
  //Network callback
  console.log('HandleNetwork!');

  socket.on('connect', function () {
    console.log('on - open');
    socket.on('message', function (data) {
      console.log('on-message', data);
      const msg = JSON.parse(BufferUtil().toString(data));
      console.log(msg);
      if (msg.event == 'welcome') {
        ctx.clientId = msg.message.id;
        self.updatePlayerList(msg.message.players);
        console.log('All players', self.players);
      }
      if (msg.event == 'playerJoin') {
        self.updatePlayerList(msg.message.players);
        console.log('New player joined', self.players);
      }
      if (msg.event == 'updatePlayerDirection') {
        self.players[msg.message.player] = {
          x: msg.message.x,
          y: msg.message.y,
          direction: msg.message.direction,
        };
      }
      if (msg.event == 'playerDisconnect') {
        delete self.players[msg.message.player];
      }
    });
    socket.on('close', function () {});
  });
};

Game.prototype.updatePlayer = function (delta, player) {
  player.x += player.direction * 30 * delta;
  if (player.direction > 0 && player.x > 300) {
    player.x = 0;
  }
  if (player.direction < 0 && player.x < 0) {
    player.x = 300;
  }
};

Game.prototype.handleLogic = function (delta) {
  const self = this;
  //Update loop
  for (let i = 0; i < Object.keys(self.players).length; i++) {
    const pid = Object.keys(self.players)[i];
    self.updatePlayer(delta, self.players[pid]);
  }
};

Game.prototype.handleGraphics = function (graphics) {
  //Draw loop
  const self = this;

  const background = new Image();
  background.src = BackgroundImage;

  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function(){
    graphics.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
  }
  graphics.fillStyle = '#222';
  graphics.fillRect(0, 400, window.innerWidth, 200);

  for (let i = 0; i < Object.keys(self.players).length; i++) {
    graphics.beginPath();
    const pid = Object.keys(self.players)[i];
    console.log('Drawing ', pid);
    if (pid == ctx.clientId) {
      graphics.fillStyle = '#fff';
    } else {
      graphics.fillStyle = '#f00';
    }
    graphics.arc(parseInt(self.players[pid].x), 500, 3, 0, Math.PI * 2, true);
    graphics.fill();
  }

  graphics.fillStyle = '#FFF';
  graphics.font = '12px Tahoma';
  const playerCount = Object.keys(self.players).length;
  graphics.fillText('Total players: ' + playerCount, 10, 10);
};
