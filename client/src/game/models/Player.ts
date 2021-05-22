export interface Player {
  socketId: string;
  nickname: string;
  x: number;
  y: number; // 거의 고정
  coin: number;
  type: PlayerType;
  direction: number; // 1 is right, 0 is left;
}

export enum PlayerType {
  ALIVE,
  DEAD,
  CORONA,
}
