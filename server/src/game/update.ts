import { clientManager } from '../client';

export function update(delta: number) {
  const ids = clientManager.all();
  for (let i = 0; i < clientManager.count(); i++) {
    const client = clientManager.get(ids[i]);
    if (client) {
      const data = clientManager.get(ids[i])!.data();
      data.player.x += data.player.direction * 30 * delta;
      if (data.player.direction > 0 && data.player.x > 300) {
        data.player.x = 0;
      }
      if (data.player.direction < 0 && data.player.x < 0) {
        data.player.x = 300;
      }
    }
  }
}
