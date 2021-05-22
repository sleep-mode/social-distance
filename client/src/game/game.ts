import { Canvas } from './canvas';
import { ctx } from './context';
import { send } from './emit';
import { PlayerObject } from './playerObject';
import { World } from './world';
import { Player } from './models/Player';
import { CoinObject, disappearTime } from './coinObject';
import { Coin } from './models/Coin';
import { triggerSound } from './utils/audio';

let score = 0;

export class Game {
  private initialized = false;
  private frame: number = 60;
  private prevFrame: number = Date.now();
  private world: World;
  private coins: Record<number, CoinObject>;
  private disappearingCoins: Record<number, CoinObject>;
  private players: Record<string, PlayerObject>;

  constructor(private readonly canvas: Canvas, private readonly objectCanvas: Canvas) {
    this.world = new World(100);
    this.players = {};
    this.coins = {};
    this.disappearingCoins = {};
  }

  public async start() {
    this.initialized = true;

    window.addEventListener('keydown', this.handleKeyboard.bind(this));
    this.prevFrame = Date.now();
    //this.update();
    window.requestAnimationFrame(this.update.bind(this));
  }

  public syncCoins(coins: Coin[]) {
    for (const coin of coins) {
      if (Object.keys(this.coins).includes(coin.id.toString())) {
        this.coins[coin.id].sync(coin);
      } else {
        this.coins[coin.id] = new CoinObject(coin);
      }
    }
    
    const ids = coins.map(coin => coin.id);
    for (const id of Object.keys(this.coins)) {
      if (!ids.includes(Number(id))) {
        // show animation
        const coin = this.coins[id];
        delete this.coins[id];
        coin.disappear();
        this.disappearingCoins[id] = coin;
        setTimeout(() => {
          delete this.disappearingCoins[id];
        }, disappearTime * 1000);
        triggerSound('coin');
      }
    }
  }

  public syncPlayers(players: Player[]) {
    for (const player of players) {
      if (Object.keys(this.players).includes(player.socketId)) {
        this.players[player.socketId].sync(player);
      } else {
        this.players[player.socketId] = new PlayerObject(player);
      }
    }

    const socketIds = players.map(player => player.socketId);
    for (const socketId of Object.keys(this.players)) {
      if (!socketIds.includes(socketId)) {
        delete this.players[socketId];
      }
    }
  }

  // update is called once per frame (if possible)
  private update() {
    let thisFrame = Date.now();

    this.updatePlayers((thisFrame - this.prevFrame) / 1000);
    this.updateViewPort(this.canvas);
    this.updateViewPort(this.objectCanvas);
    this.draw();

    this.prevFrame = thisFrame;

    window.requestAnimationFrame(this.update.bind(this));
  }

  // @params: deltaTime in second
  private updatePlayers(deltaTime: number) {
    for (const key in this.players) {
      this.players[key].update(deltaTime);
    }
  }

  private updateViewPort(canvas: Canvas) {
    if (!ctx.clientId) return;

    const myPlayer = this.players[ctx.clientId];
    if (myPlayer) {
      // TODO: use config
      canvas.viewPort = -Math.max(0, Math.min(myPlayer.getPlayer().x - canvas.width / 2, 8000 - canvas.width));
    }
  }

  handleKeyboard(event) {
    if ((event.keyCode || event.which) === 32) {
      const myPlayer = this.players[ctx.clientId];
      if (myPlayer) {
        // known bug: if you revert direction first and press start again, it will not work
        myPlayer.getPlayer().direction *= -1;
      }
      send('CHANGE_DIRECTION');
    }
  }

  draw() {
    if (!this.initialized) {
      return;
    }

    this.flush(this.objectCanvas);
    this.drawObjects();
    this.drawInfo();
  }

  flush(canvas: Canvas) {
    canvas.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawObjects() {
    this.world.draw(this.canvas);
    for (const key in this.coins) {
      this.coins[key].draw(this.objectCanvas);
    }
    for (const key in this.disappearingCoins) {
      this.disappearingCoins[key].draw(this.objectCanvas);
    }
    for (const key in this.players) {
      this.players[key].draw(this.objectCanvas);
    }
  }

  drawInfo() {
    const context = this.canvas.context;

    context.fillStyle = '#FFF';
    context.font = '12px Tahoma';
    const playerCount = Object.keys(this.players).length;
    context.fillText('Total players: ' + playerCount, 10, 10);
    context.fillText('Score: ' + score, 10, 20);
  }
}
