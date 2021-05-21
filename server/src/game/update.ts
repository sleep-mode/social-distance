import { clientManager } from '../client';

export function update(delta: number) {
  for (const player of clientManager.getPlayers()) {
    player.update(delta);
  }
}
