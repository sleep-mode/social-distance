import { Player } from './Player';
import { Coin } from './Coin';

export class GameState {
  players: Record<string, Player>;
  coins: Record<string, Coin>;

  constructor() {
    this.players = {};
    this.coins = {};
  }

  serialize() {
    return {
      players: Object.values(this.players),
      coins: Object.values(this.coins),
    };
  }
}
