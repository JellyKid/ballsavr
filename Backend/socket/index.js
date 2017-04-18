const socketio = require('socket.io');
const round = require('./namespace/round');

module.exports = (server) => {
  const io = socketio(server);
  round(io);
};
