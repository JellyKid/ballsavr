const socketio = require('socket.io');

module.exports = (server) => {
  const io = socketio(server);
  require('./namespace/round')(io);
};
