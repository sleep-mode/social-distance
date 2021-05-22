import { Player } from './entity/Player';
import { Coin } from './entity/Coin';

export class GameState {
  players: Record<string, Player>;
  coins: Set<Coin>;
  startedAt: number;
  lastCoinGeneratedAt: number;

  constructor() {
    this.players = {};
    this.coins = new Set();
    this.startedAt = Date.now();
    this.lastCoinGeneratedAt = Date.now();
  }

  serialize() {
    return {
      players: Object.values(this.players),
      coins: Array.from(this.coins.values()),
    };
  }
}
