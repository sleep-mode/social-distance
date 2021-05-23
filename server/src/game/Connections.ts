import { Server, Socket } from 'socket.io';
import { config } from '../config';

export class Connections {
  private maxConnection = 50;

  constructor(
    private readonly io: Server,
    private readonly connections: Record<string, Socket> = {}
  ) {}

  public add(socket: Socket) {
    if (Object.keys(this.connections).length <= this.maxConnection) {
      socket.join(config.roomName); // hard-coded
      this.connections[socket.id] = socket;
    } else {
      socket.send('ERROR', {
        code: 'MAX_CONNECTION_EXCEED',
      });
    }
  }

  public getSocketById(socketId: string): Socket | undefined {
    return this.connections[socketId];
  }

  public remove(socket: Socket) {
    delete this.connections[socket.id];
  }
}
