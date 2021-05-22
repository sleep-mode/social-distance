import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { GameServer } from './game/GameServer';
import { Connections } from './game/Connections';
import { GameState } from './game/GameState';

const option = { cors: { origin: '*', methods: ['GET', 'POST'] } };

export async function bootstrap() {
  const server = http.createServer(express());
  const io = new Server(server, option);

  const gameServer = new GameServer(io, new GameState(), new Connections(io));
  gameServer.start();

  return server;
}
