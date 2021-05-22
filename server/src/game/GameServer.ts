import { Socket, Server } from 'socket.io';
import { Connections } from './Connections';
import { GameState } from './GameState';
import { loop } from './loop';
import { config } from '../config';
import { Player } from './Player';

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
        handleMessage({ connections, state, io }, { socketId: socket.id, action, params });
      });

      socket.on('disconnect', () => {
        state.players.delete(socket.id);
        connections.remove(socket);
      });
    });
  }
}

/* ---------------------------------------------------------- *
 *
 *  TODO: move to other file
 *
 * ---------------------------------------------------------- */
interface Dependencies {
  connections: Connections;
  state: GameState;
  io: Server;
}

interface ClientEvent {
  action: string;
  params: Record<string, string>;
  socketId: string;
}

/**
 * 클라이언트로부터 오는 메시지 처리
 */
function handleMessage({ state }: Dependencies, { action, params, socketId }: ClientEvent) {
  if (action === 'READY') {
    state.players.set(
      socketId,
      new Player({
        socketId,
        coin: 0,
        nickname: params.nickName ?? '',
        x: 0,
        y: 0,
      })
    );
  }

  if (action === 'CHANGE_DIRECTION') {
    //
  }
}

/**
 * 플레이어 위치 업데이트
 */
function updatePlayerLocation(state: GameState) {
  return (delta: number) => {
    state.players.forEach(player => {
      player.update(delta);
    });
  };
}

/**
 * 모든 클라이언트 상태 싱크 전송
 */
function broadcastState(state: GameState, io: Server) {
  return () => {
    io.to(config.roomName).emit('SYNC', state.serialize());
  };
}
