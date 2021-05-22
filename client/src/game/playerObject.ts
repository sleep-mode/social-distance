import { Canvas } from './canvas';
import { ctx } from './context';
import { Drawable } from './drawable';
import { Player, PlayerType } from './models/Player';
import CharacterImage from './assets/character.png';
import { loadImage } from './utility';

const spriteSize = {
  x: 60,
  y: 60,
};

let sprite: HTMLImageElement;
loadImage(CharacterImage).then(res => {
  sprite = res;
});

export class PlayerObject implements Drawable {
  private socketId: string;
  private player: Player;
  private sprite?: HTMLImageElement;
  constructor(player: Player) {
    this.player = player;
    this.socketId = player.socketId;
  }

  public getPlayer(): Player {
    return this.player;
  }

  public update(deltaTime: number) {
    this.player.x += 300 * this.player.direction * deltaTime;
  }

  public sync(player: Player) {
    this.player = player;
  }

  draw: (canvas: Canvas) => void = canvas => {
    if (!sprite) return;

    const context = canvas.context;
    const offset = this.getSpriteOffset();
    context.drawImage(
      sprite,
      offset.sx,
      offset.sy,
      offset.sw,
      offset.sh,
      this.player.x + canvas.viewPort - spriteSize.x / 2,
      canvas.height - spriteSize.y - 20,
      spriteSize.x,
      spriteSize.y
    );
  };

  private getSpriteOffset() {
    const isZombie = this.player.type === PlayerType.ZOMBIE;
    const isMyPlayer = this.socketId === ctx.clientId;
    const direction = this.player.direction;
    const animationFrame = Math.ceil((Date.now() / 100) % 2) - 1;
    return {
      sx: (direction === 1 ? 0 : spriteSize.x * 3) + animationFrame * spriteSize.x,
      sy: isZombie ? 0 : isMyPlayer ? spriteSize.y : spriteSize.y * 3,
      sw: spriteSize.x,
      sh: spriteSize.y,
    };
  }
}
