import { ctx } from './context';
import { stringToBuffer } from './utils/buffer-until';

export function send(action: string, params: Record<string, string> = {}) {
  ctx.socket.send(
    stringToBuffer(
      JSON.stringify({
        action,
        params,
      })
    )
  );
}
