const Total = require('../../db/models/Total');
const Score = require('../../db/models/Score');
const broadcastRankingsToRound = require('../../socket/lib/broadcastRankingsToRound');

const pa = [4,2,1,0]; //temporarily using this points array untill rules are created.

function tallyAndSavePoints(scores, pointsArray) {
  let prevScore = 0;
  let i = 0;
  const promises = [];
  scores
  .sort((a,b) => a.value < b.value)
  .forEach((score) => {
    score.set({points: pointsArray[i]});
    if(score.get('value') !== prevScore && i < pointsArray.length){
      i++;
    }
    prevScore = score.get('value');
    promises.push(score.save());
  });
  return Promise.all(promises);
}

function tallyAndSaveTotals(round) {
  return Score.mapReduce(
    {
      map : function () {emit(this.player,this.points);},
      reduce : function (key, values) {return Array.sum(values);},
      query: {round: round}
    }
  )
  .then(
    (results) => {
      results.forEach((res) => {console.log(res);});
      const promises = results.map(
        (res) => Total.findOneAndUpdate(
          {
            round: round,
            player: res._id
          },
          {
            value: res.value
          },
          {
            new: true
          }
        )
        .populate({path: 'player', select: 'firstName lastName initials'})
      );
      return Promise.all(promises);
    }
  );
}

module.exports = (req, res, next) => {
  if(!res.locals.score){return next();}
  if(!res.locals.score.confirmed){
    broadcastRankingsToRound(res.locals.score.round);
    return next();
  }
  let score = res.locals.score;
  let round = score.round;
  //this is async on purpose
  Score
  .find({
    group: score.group,
    round: score.round,
    table: score.table,
    confirmed: true
  })
  .then(
    (scores) => tallyAndSavePoints(scores, pa)
  )
  .then(
    (scores) => tallyAndSaveTotals(round)
  )
  .then(
    () => broadcastRankingsToRound(round)
  )
  .catch(
    (err) => console.log(err)
  );
  return next();
};
