import { PlayerObject } from './entity/Player';
import { Coin } from './model/Coin';

export class GameState {
  players: Record<string, PlayerObject>;
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
