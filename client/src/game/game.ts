import { ctx } from './context';
import { send } from './emit';
import BackgroundImage from './assets/bg_1.png';

async function loadImage(asset: any): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = asset;
  return new Promise(resolve => {
    image.addEventListener('load', () => {
      resolve(image);
    });
  });
}

let score = 0;

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
  private initialized = false;
  private bg?: HTMLImageElement;

  public players: Player[] = [];

  public async start() {
    this.bg = await loadImage(BackgroundImage);
    this.initialized = true;
    window.addEventListener('keydown', this.handleKeyboard.bind(this));
  }

  handleKeyboard(event) {
    console.log('gotcha');
    if ((event.keyCode || event.which) === 32) {
      send('playerDirection');
    }
  }

  draw() {
    if (!this.initialized) {
      return;
    }
    this.drawBackground();
    this.drawPlayers();
    //Draw loop
    // const background = new Image();
    // background.src = BackgroundImage;
    //
    // // Make sure the image is loaded first otherwise nothing will draw.
    // background.onload = function () {
    //   this.canvas.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
    // }.bind(this);
    //
    // this.canvas.fillStyle = '#222';
    // this.canvas.fillRect(0, 100, window.innerWidth, 200);

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

  private drawBackground() {
    if (this.bg != null) {
      this.canvas.drawImage(this.bg, 0, 0, window.innerWidth, window.innerHeight);
    }
  }

  private drawPlayers() {
    for (const player of this.players) {
      this.canvas.beginPath();
      const playerId = player.socketId;
      if (playerId === ctx.clientId) {
        this.canvas.font = '12px Tahoma';
        this.canvas.fillStyle = '#fff';
      } else {
        this.canvas.fillStyle = '#f0f';
      }
      this.canvas.arc(player.x, 200, 30, 0, Math.PI * 2, true);
      this.canvas.fill();
      this.canvas.fillText(playerId, player.x, player.y + 20);
    }
  }
}
