export interface Player {
  socketId: string;
  nickname: string;
  x: number;
  y: number; // 거의 고정
  hp: number;
  coin: number;
  mask: boolean;
  type: PlayerType;
  character: Character;
  direction: number; // 1 is right, 0 is left;
}

export enum PlayerType {
  ALIVE,
  DEAD,
  ZOMBIE,
}

export enum Character {
  Taco,
  Seji,
  Semo,
  Cana,
  Nabi,
  Simo,
}
