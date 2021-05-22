import { ctx } from './context';
import { send } from './emit';
import { World } from './world';

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
  constructor(private readonly canvas: CanvasRenderingContext2D) {
    this.world = new World(100);
  }
  private initialized = false;
  private frame: number = 60;
  private prevFrame: number = Date.now();
  private world: World;

  public players: Player[] = [];
  public myPlayer?: Player;

  public async start() {
    await this.world.initialize();

    this.players.forEach(player => {
      if (player.socketId === ctx.clientId) {
        this.myPlayer = player;
      }
    });

    this.initialized = true;

    window.addEventListener('keydown', this.handleKeyboard.bind(this));
    this.prevFrame = Date.now();
    this.update();
  }

  // update is called once per frame (if possible)
  private update() {
    let thisFrame = Date.now();

    this.updatePlayers((thisFrame - this.prevFrame) / 1000);
    this.draw();
    this.prevFrame = thisFrame;

    setTimeout(() => { this.update(); }, 1000 / this.frame);
  }

  // @params: deltaTime in second
  private updatePlayers(deltaTime: number) {
    this.players.forEach(player => {
      // TODO: create common config
      player.x += 300 * player.direction * deltaTime;
    });
  }

  handleKeyboard(event) {
    console.log('gotcha');
    if ((event.keyCode || event.which) === 32) {
      if (this.myPlayer) {
        this.myPlayer.direction *= -1;
      }
      send('playerDirection');
    }
  }

  draw() {
    if (!this.initialized) {
      return;
    }

    this.world.draw(this.canvas);
    this.drawPlayers();

    this.canvas.fillStyle = '#FFF';
    this.canvas.font = '12px Tahoma';
    const playerCount = Object.keys(this.players).length;
    this.canvas.fillText('Total players: ' + playerCount, 10, 10);
    this.canvas.fillText('Score: ' + score, 10, 20);
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
