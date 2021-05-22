import { Canvas } from './canvas';
import { ctx } from './context';
import { Drawable } from './drawable';
import { Player, PlayerType } from './models/Player';
import CharacterImage from './assets/character.png';
import HPLeftImage from './assets/bar-l.png';
import HPCenterImage from './assets/bar-c.png';
import HPRightImage from './assets/bar-r.png';
import { loadImage } from './utility';

const spriteSize = {
  x: 60,
  y: 60,
};

let sprite: HTMLImageElement;
loadImage(CharacterImage).then(res => {
  sprite = res;
});

const hpSpriteSize = 40;

let hpImages: HTMLImageElement[];
const pendingImages = [
    HPLeftImage,
    HPCenterImage,
    HPRightImage,
].map(loadImage);
Promise.all(pendingImages).then(images => {
    hpImages = images;
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
    if (!sprite || !hpImages) return;

    const context = canvas.context;
    const offset = this.getSpriteOffset();
    const x = Math.round(this.player.x + canvas.viewPort - spriteSize.x / 2);
    const y = canvas.height - spriteSize.y - 20;

    if (this.player.socketId === ctx.clientId) {
        const hp = Math.max(0, this.player.hp);
        const basicOffset = 10;
        const hpLength = Math.round(hp / 100 * hpSpriteSize);
        const hpOffset = Math.round((hpSpriteSize - hpLength) / 2);
        const sideLength = hp < 10 ? Math.round(2 * (hp / 10)) : 2;
        const centerLength = hpLength - sideLength * 2;

        let hpX = x + basicOffset + hpOffset;
        context.drawImage(hpImages[0], hpX, y - 12, sideLength, 4);
        hpX += sideLength;
        context.drawImage(hpImages[1], hpX, y - 12, centerLength, 4);
        hpX += centerLength;
        context.drawImage(hpImages[2], hpX, y - 12, sideLength, 4);
    }
    context.drawImage(
      sprite,
      offset.sx,
      offset.sy,
      offset.sw,
      offset.sh,
      x,
      y,
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
