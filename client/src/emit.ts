import { ctx } from './context';
import { BufferUtil } from './utils/buffer-until';

export function emit(event, message) {
  ctx.socket.send(
    BufferUtil().from(
      JSON.stringify({
        event: event,
        message: message,
      })
    )
  );
}
