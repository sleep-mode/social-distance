interface PlayerProps {
  socketId: string;
  nickname: string;
  x: number;
  y: number; // 거의 고정
  coin: number;
  direction?: number; // 1 is right, 0 is left;
}

const speed = 300;

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
    this.x += delta * this.x * speed;
  }
}
