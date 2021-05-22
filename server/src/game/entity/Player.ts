import { config } from '../../config';

interface PlayerProps {
  socketId: string;
  nickname: string;
  x: number;
  y: number; // 거의 고정
  hp?: number;
  coin: number;
  type?: PlayerType;
  direction?: number; // 1 is right, 0 is left;
}

export enum PlayerType {
  ALIVE,
  DEAD,
  ZOMBIE,
}

export class Player {
  socketId: string;
  nickname: string;
  x: number;
  y: number; // 거의 고정
  coin: number;
  hp: number;
  type: PlayerType;
  direction: number; // 1 is right, -1 is left;

  constructor({ coin, direction = 1, nickname, socketId, x, y, type = PlayerType.ALIVE, hp = 100 }: PlayerProps) {
    this.coin = coin;
    this.direction = direction;
    this.nickname = nickname;
    this.socketId = socketId;
    this.hp = hp;
    this.x = x;
    this.y = y;
    this.type = type;
  }

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
