const Total = require('../../db/models/Total');

function getRankings(id) {
  return Total
  .find({round: id})
  .populate({path: 'player', select: 'firstName lastName initials'})
  .lean()
  .exec(
    (err, totals) => {
      if(err){console.log(err);}
      return totals || [];
    }
  );
}

const main = (namespace, socket, round ) => {
  socket.on('get rankings', () => {
    getRankings(round)
    .then(
      (rankings) => {socket.emit('rankings', rankings);}
    )
    .catch(
      (err) => {console.log(err);}
    );
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
