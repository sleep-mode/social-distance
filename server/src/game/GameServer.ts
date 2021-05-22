import { Socket, Server } from 'socket.io';
import { Connections } from './Connections';
import { GameState } from './GameState';
import { loop } from './loop';
import { config } from '../config';
import { handleMessage } from './handler';

export class GameServer {
  constructor(
    private readonly io: Server,
    private readonly state: GameState,
    private readonly connections: Connections
  ) {}

  start() {
    this.startLoop();
    this.handleConnect();
  }

  private startLoop() {
    const { io, state } = this;
    loop(updatePlayerLocation(state), broadcastState(state, io));
  }

  private handleConnect() {
    const { io, state, connections } = this;

    io.on('connection', (socket: Socket) => {
      connections.add(socket);

      socket.on('message', (action, params = {}) => {
        console.log({ action, params });
        handleMessage({ connections, state, io }, { socketId: socket.id, action, params });
      });

      socket.on('disconnect', () => {
        console.log(`[disconnect]: ${socket.id}`);
        delete state.players[socket.id];
        connections.remove(socket);
      });
    });
  }
}
