import { BufferUtil } from './utils/buffer-until';
import { ctx } from './context';
import { emit } from './emit';
import { Socket } from 'socket.io-client';
import BackgroundImage from '../img/bg.png';

let score = 0;

interface Coin {
  x: number;
  y: number;
}

interface Player {
  socketId: string;
  nickname: string;
  x: number;
  y: number; // 거의 고정
  coin: number;
  direction: number; // 1 is right, -1 is left;
}

export class Game {
  constructor(private readonly canvas: CanvasRenderingContext2D) {}

  public players: Player[] = [];
  private coins: Coin[] = [];
  private pid = -1;
  private name = '';

  public start() {
    window.addEventListener('keydown', this.handleKeyboard.bind(this));
  }

  handleKeyboard(event) {
    console.log('gotcha');
    if ((event.keyCode || event.which) == 32) {
      emit('playerDirection', {
        clientId: ctx.clientId,
      });
    }
  }

  draw() {
    //Draw loop
    // const background = new Image();
    // background.src = BackgroundImage;
    //
    // // Make sure the image is loaded first otherwise nothing will draw.
    // background.onload = function () {
    //   this.canvas.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
    // }.bind(this);
    //
    this.canvas.fillStyle = '#222';
    this.canvas.fillRect(0, 100, window.innerWidth, 200);

    /*
    const dummyPositions = [100, 500, 600, 1200, 1300, 1400, 1500];
    dummyPositions.forEach(x => {
      graphics.beginPath();
      graphics.arc(x, middle, 30, 0, Math.PI * 2, true);
      graphics.fillStyle = '#555';
      graphics.fill();
    });
    */

    for (const player of this.players) {
      this.canvas.beginPath();
      const playerId = player.socketId;
      if (playerId == ctx.clientId) {
        this.canvas.font = '12px Tahoma';
        this.canvas.fillStyle = '#fff';
      } else {
        this.canvas.fillStyle = '#f0f';
      }
      this.canvas.arc(player.x, 200, 30, 0, Math.PI * 2, true);
      this.canvas.fill();
      this.canvas.fillText(playerId, player.x, player.y + 20);
    }

    /*
    for (let i = 0; i < this.coins.length; i++) {
      this.canvas.beginPath();
      this.canvas.fillStyle = '#ff0';
      this.canvas.arc(this.coins[i]?.x, this.coins[i]?.y, 15, 0, Math.PI * 2, true);
      this.canvas.fill();
    }
    */

    this.canvas.fillStyle = '#FFF';
    this.canvas.font = '12px Tahoma';
    const playerCount = Object.keys(this.players).length;
    this.canvas.fillText('Total players: ' + playerCount, 10, 10);
    this.canvas.fillText('Score: ' + score, 10, 20);
  }
}
