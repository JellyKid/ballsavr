const getTotalsAndScoresForRound = require('../../lib/db/getTotalsAndScoresForRound');

const main = (namespace, socket, round) => {
  socket.on('refresh', () => {
    getTotalsAndScoresForRound(round)
    .then((stats) => socket.emit('rankings', stats))
    .catch((err) => console.log(err));
  });
};

module.exports = (io) => {
  const namespace = io.of('/round');
  namespace.on('connect',(socket) => {
    socket.on('join round', (round) => {
      socket.join(round,() => {
        main(namespace, socket, round);
      });
    });
  });
};
