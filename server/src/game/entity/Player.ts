import { config } from '../../config';
import { Character, Player, PlayerType } from '../model/Player';

export class PlayerObject implements Player {
  constructor(
    public socketId: string,
    public nickname: string,
    public x: number,
    public y: number, // 거의 고정
    public hp: number,
    public mask: boolean,
    public coin: number,
    public type: PlayerType,
    public character: Character,
    public direction: number // 1 is right, 0 is left;
  ) {}

  changeDirection() {
    this.direction = this.direction * -1;
  }

  damanged(amount = 1) {
    if (this.type === PlayerType.ALIVE) {
      this.hp - amount;
      if (this.hp <= 0) {
        this.type = PlayerType.ZOMBIE;
      }
    }
  }

  update(delta: number) {
    this.x = this.x + this.direction * delta * config.speed;

    if (this.direction > 0 && this.x > config.mapWidth) {
      this.x = this.x % config.mapWidth;
    }

    if (this.direction < 0 && this.x < 0) {
      this.x = config.mapWidth;
    }
  }
}
