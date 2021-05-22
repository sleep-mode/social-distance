import { ctx } from './context';
import { BufferUtil } from './utils/buffer-until';

export function emit(action: string, params: Record<string, string>) {
  ctx.socket.send(
    BufferUtil().from(
      JSON.stringify({
        action,
        params,
      })
    )
  );
}
