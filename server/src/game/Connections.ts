import { Server, Socket } from 'socket.io';
import { config } from '../config';

export class Connections {
  private maxConnection = 20;

  constructor(private readonly io: Server, private readonly connections = new Map<string, Socket>()) {}

  public add(socket: Socket) {
    // if (this.connections.size >= this.maxConnection) {
    socket.join(config.roomName); // hard-coded
    this.connections.set(socket.id, socket);

    // } else {
    //   socket.send('ERROR', {
    //     code: 'MAX_CONNECTION_EXCEED',
    //   });
    // }
  }

  public remove(socket: Socket) {
    this.connections.delete(socket.id);
  }
}
