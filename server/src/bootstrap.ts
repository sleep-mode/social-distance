import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { handleConnection } from './handleConnection';
import createGameServer from './game/createGameServer';

export async function bootstrap() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  const gameServer = createGameServer();

  handleConnection(io, gameServer);

  return server;
}
