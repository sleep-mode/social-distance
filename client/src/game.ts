import { BufferUtil } from './utils/buffer-until';
import { ctx } from './context';
import { emit } from './emit';
import { Socket } from 'socket.io-client';
import BackgroundImage from '../img/bg.png';
const MAP_HEIGHT = 300;

const width = 1000; //window.innerWidth;
const middle = window.innerHeight / 2;
const speed = 300;
let coinSpawn = 1;
let lastCoinSpawn = 1;
let score = 0;

interface Coin {
  x: number;
  y: number;
}

export class Game {
  public players: any[] = [];
  private coins: Coin[] = [];
  private pid = -1;
  private name = '';

  public start() {
    addEventListener('keydown', this.handleKeyboard.bind(this));
  }

  initPlayer(name) {
    return {
      name: name,
      x: 10,
      y: middle,
      direction: -1,
    };
  }

  spawnCoin() {
    return {
      x: Math.random() * width,
      y: middle,
    };
  }

  handleKeyboard(event) {
    console.log('gotcha');
    if ((event.keyCode || event.which) == 32) {
      if (this.players[ctx.clientId]) {
        this.players[ctx.clientId].direction *= -1;
        emit('playerDirection', {
          clientId: ctx.clientId,
          direction: this.players[ctx.clientId].direction,
        });
      }
    }
  }

  updatePlayerList(playersData) {
    const players = Object.keys(playersData);
    for (let i = 0; i < players.length; i++) {
      const pid = players[i];
      this.players[pid] = playersData[pid].player;
    }
  }

  updatePlayer(delta, player) {
    player.x += player.direction * speed * delta;
    if (player.direction > 0 && player.x > width) {
      player.x = player.x % 1000;
    }
    if (player.direction < 0 && player.x < 0) {
      player.x = width;
    }
  }

  checkCollision(player, objects, callback) {
    const threshold = 1;
    const removeTarget = [];
    for (let i = 0; i < objects.length; i++) {
      if (Math.abs(player.x - objects[i].x) < threshold) {
        // TODO: removeTarget.push(objects[i]);
      }
    }
    for (let i = 0; i < removeTarget.length; i++) {
      if (objects.splice(objects.indexOf(removeTarget[i]), 1).length > 0) {
        callback();
      }
    }
  }

  handleLogic(delta) {
    //Update loop
    for (let i = 0; i < Object.keys(this.players).length; i++) {
      const pid = Object.keys(this.players)[i];
      this.updatePlayer(delta, this.players[pid]);
      this.checkCollision(this.players[pid], this.coins, () => {
        score++;
      });
    }
    lastCoinSpawn += delta;
    if (lastCoinSpawn > coinSpawn) {
      lastCoinSpawn = 0;
      this.coins.push(this.spawnCoin());
    }
  }

  handleGraphics(graphics) {
    //Draw loop

    const background = new Image();
    background.src = BackgroundImage;

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function () {
      graphics.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
    };
    graphics.fillStyle = '#222';
    graphics.fillRect(0, 400, window.innerWidth, 200);

    /*
    const dummyPositions = [100, 500, 600, 1200, 1300, 1400, 1500];
    dummyPositions.forEach(x => {
      graphics.beginPath();
      graphics.arc(x, middle, 30, 0, Math.PI * 2, true);
      graphics.fillStyle = '#555';
      graphics.fill();
    });
    */

    for (let i = 0; i < Object.keys(this.players).length; i++) {
      graphics.beginPath();
      const pid = Object.keys(this.players)[i];
      console.log('Drawing ', pid);
      if (pid == ctx.clientId) {
        const playerPosition = this.players[pid];
        graphics.font = '12px Tahoma';
        graphics.fillStyle = '#fff';
        // graphics.fillText(nearPlayerCount(), parseInt(playerPosition.x), parseInt(playerPosition.y) - 50);
      } else {
        graphics.fillStyle = '#f0f';
      }
      graphics.arc(parseInt(this.players[pid].x), 500, 30, 0, Math.PI * 2, true);
      graphics.fill();
      graphics.fillText(pid, this.players[pid].x, parseInt(this.players[pid].y + 20));
    }
    for (let i = 0; i < this.coins.length; i++) {
      graphics.beginPath();
      graphics.fillStyle = '#ff0';
      graphics.arc(this.coins[i]?.x, this.coins[i]?.y, 15, 0, Math.PI * 2, true);
      graphics.fill();
    }

    graphics.fillStyle = '#FFF';
    graphics.font = '12px Tahoma';
    const playerCount = Object.keys(this.players).length;
    graphics.fillText('Total players: ' + playerCount, 10, 10);
    graphics.fillText('Score: ' + score, 10, 20);
  }
}
