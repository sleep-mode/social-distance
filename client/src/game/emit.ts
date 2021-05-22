import { ctx } from './context';

export function send(action: string, params: Record<string, string> = {}) {
  ctx.socket.send(action, params);
}
