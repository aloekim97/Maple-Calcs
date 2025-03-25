export default function itemStats(
  start: number,
  end: number,
  equipLevel: number
): {
  finalStats: { stat: number; att: number };
  difference: { stat: number; att: number };
} {
  const post15: { [key: number]: { stat: number; att: number } } = {
    130: { stat: 7, att: 7 },
    140: { stat: 9, att: 8 },
    150: { stat: 11, att: 9 },
    160: { stat: 13, att: 10 },
    200: { stat: 15, att: 12 },
    250: { stat: 17, att: 14 },
  };

  const { stat: baseStat, att: baseAtt } = post15[equipLevel] || {
    stat: 0,
    att: 0,
  };

  const calculateStatsUpTo = (targetStar: number) => {
    let currentStat = 0;
    let currentAtt = 0;
    let attIncrement = baseAtt;

    for (let star = 0; star < targetStar; star++) {
      if (star < 5) {
        currentStat += 2;
      } else if (star < 15) {
        currentStat += 3;
      } else if (star < 20) {
        currentStat += baseStat;
        currentAtt += attIncrement;
        attIncrement += 1;
      } else if (star === 21) {
        currentStat += baseStat;
        currentAtt += attIncrement;
      } else if (star < 30) {
        currentAtt += attIncrement;
        attIncrement += 2;
      }
    }

    return { stat: currentStat, att: currentAtt };
  };

  const currentStats = calculateStatsUpTo(start);

  const additionalStats = calculateStatsUpTo(end);

  const finalStats = {
    stat: additionalStats.stat,
    att: additionalStats.att,
  };

  const difference = {
    stat: additionalStats.stat - currentStats.stat,
    att: additionalStats.att - currentStats.att,
  };

  return { finalStats, difference };
}
