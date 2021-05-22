export interface Player {
    socketId: string;
    nickname: string;
    x: number;
    y: number; // 거의 고정
    coin: number;
    direction: number; // 1 is right, -1 is left;
  }