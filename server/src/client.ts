import { ctx } from './context';

function Client() {
  return {
    add: function (socket) {
      ctx.SOCKET_CLIENTS[socket.id] = socket;
      ctx.CLIENT_DATA[socket.id] = {};
    },
    remove: function (socketId) {
      delete ctx.SOCKET_CLIENTS[socketId];
      delete ctx.CLIENT_DATA[socketId];
    },
    count: function () {
      return Object.keys(ctx.SOCKET_CLIENTS).length;
    },
    all: function () {
      return Object.keys(ctx.SOCKET_CLIENTS);
    },
    allData: function () {
      return ctx.CLIENT_DATA;
    },
    get: function (id) {
      if (!ctx.SOCKET_CLIENTS[id]) return null;
      return {
        data: function () {
          return ctx.CLIENT_DATA[id];
        },
        emit: function (eventName, data) {
          if (ctx.SOCKET_CLIENTS[id]) {
            ctx.SOCKET_CLIENTS[id].send(Buffer.from(JSON.stringify({ event: eventName, message: data })));
          }
        },
        broadcast: function (eventName, data) {
          console.log('broadcast', data);
          Object.keys(ctx.SOCKET_CLIENTS).map(function (cid) {
            if (cid != id) {
              ctx.SOCKET_CLIENTS[cid].send(Buffer.from(JSON.stringify({ event: eventName, message: data })));
            }
          });
        },
      };
    },
  };
}

export default Client;
