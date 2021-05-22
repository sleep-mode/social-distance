import { Coin } from '../model/Coin';

let coinId = 0;

export function createCoin(x: number, amount: number): Coin {
  return {
    x,
    id: coinId++,
    amount,
  };
}
