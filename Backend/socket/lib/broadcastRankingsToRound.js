const Total = require('../../db/models/Total');

module.exports = (round) => {
  const io = require('../../express');
  return Total
  .find({round: round})
  .populate({path: 'player', select: 'firstName lastName initials'})
  .lean()
  .exec(
    (err, totals) => {
      if(err) throw err;
      // console.log(`totals ${totals}`);
      if(totals){
        io.of('/round').in(round).emit('rankings', totals);
      }
    }
  );
};
