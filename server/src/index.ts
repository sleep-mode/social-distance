import createGameServer from './server';
import Client from './client';
import engine from 'engine.io';
// const engineServer = engine.listen(5000, {
//   allowRequest: {},
// });

import express from 'express';
import cors from 'cors';
import http from 'http';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const gameServer = createGameServer();

/*
Socket backend - This part should not be edited
*/

io.on('connection', function (socket) {
  console.log('Connection received');
  if (!Client().get(socket.id)) {
    Client().add(socket);
  }
  gameServer.connection(socket.id);

  socket.on('message', function (data) {
    console.log('on message');
    const stringified = data.toString('utf-8').replace(/\0/g, ''); //Take \0 ending character into account
    const req = JSON.parse(stringified);
    gameServer.on(req.event, req.message);
  });

  socket.on('close', function () {
    console.log('on close');
    if (Client().get(socket.id)) {
      gameServer.disconnect(socket.id);
      Client().remove(socket.id);
    }
  });
});

server.listen(5000, () => {
  console.log('server listen 5000');
});
