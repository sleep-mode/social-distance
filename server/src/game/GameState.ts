import { Player } from './Player';

class Coin {
  x: number;
  y: number;
}

export class GameState {
  players: Map<string, Player>;
  coins: Map<string, Coin>;

  constructor() {
    this.players = new Map();
    this.coins = new Map();
  }

  serialize() {
    return {
      players: this.players.values(),
      coins: this.coins.values(),
    };
  }
}
