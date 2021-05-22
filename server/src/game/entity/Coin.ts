export interface Coin {
  x: number;
  id: number;
  amount: number;
}

let coinId = 0;

export function createCoin(x: number, amount: number): Coin {
  return {
    x,
    id: coinId++,
    amount,
  };
}
