import { config } from '../config';
interface PlayerProps {
  socketId: string;
  nickname: string;
  x: number;
  y: number; // 거의 고정
  coin: number;
  direction?: number; // 1 is right, 0 is left;
}

export class Player {
  socketId: string;
  nickname: string;
  x: number;
  y: number; // 거의 고정
  coin: number;
  direction: number; // 1 is right, -1 is left;

  constructor({ coin, direction = 1, nickname, socketId, x, y }: PlayerProps) {
    this.coin = coin;
    this.direction = direction;
    this.nickname = nickname;
    this.socketId = socketId;
    this.x = x;
    this.y = y;
  }

  changeDirection() {
    this.direction = this.direction * -1;
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
