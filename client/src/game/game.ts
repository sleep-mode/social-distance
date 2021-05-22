import { Canvas } from './canvas';
import { ctx } from './context';
import { send } from './emit';
import { Player } from './player';
import { PlayerObject } from './playerObject';
import { World } from './world';

let score = 0;

export class Game {
  constructor(private readonly canvas: Canvas) {
    this.world = new World(100);
  }
  private initialized = false;
  private frame: number = 60;
  private prevFrame: number = Date.now();
  private world: World;

  public players: Player[] = [];
  public myPlayer() {
    let myPlayer = this.players.find(player => player.socketId === ctx.clientId);
    return myPlayer;
  };

  public async start() {
    await this.world.initialize();

    this.initialized = true;

    window.addEventListener('keydown', this.handleKeyboard.bind(this));
    this.prevFrame = Date.now();
    this.update();
  }

  // update is called once per frame (if possible)
  private update() {
    let thisFrame = Date.now();
    if (this.players.length > 0) {
      this.updatePlayers((thisFrame - this.prevFrame) / 1000);
      this.updateViewPort(this.canvas);
      this.draw();
    }
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

  private updateViewPort(canvas: Canvas) {
    let myPlayer = this.myPlayer();
    if (myPlayer) {
      // TODO: use config
      canvas.viewPort = -Math.max(0, Math.min(myPlayer.x - canvas.width / 2, 1600 - canvas.width));
    }
  }

  handleKeyboard(event) {
    if ((event.keyCode || event.which) === 32) {
      send('playerDirection');
      let myPlayer = this.myPlayer();
      if (myPlayer) {
        // known bug: if you revert direction first and press start again, it will not work
        myPlayer.direction *= -1;
      }
    }
  }

  draw() {
    if (!this.initialized) {
      return;
    }

    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.world.draw(this.canvas);
    this.drawPlayers();

    const context = this.canvas.context;

    context.fillStyle = '#FFF';
    context.font = '12px Tahoma';
    const playerCount = Object.keys(this.players).length;
    context.fillText('Total players: ' + playerCount, 10, 10);
    context.fillText('Score: ' + score, 10, 20);
  }

  private drawPlayers() {
    const context = this.canvas.context;

    for (const player of this.players) {
      new PlayerObject(player).draw(this.canvas);
    }
  }
}
