export default function itemStats(
  start: number,
  end: number,
  equipLevel: number
): {
  // finalStats: { stat: number; att: number };
  difference: { stat: number; att: number };
} {
  const roundedLevel = Math.floor(equipLevel / 10) * 10;
  const post15: { [key: number]: { stat: number; att: number } } = {
    130: { stat: 7, att: 7 },
    140: { stat: 9, att: 8 },
    150: { stat: 11, att: 9 },
    160: { stat: 13, att: 10 },
    200: { stat: 15, att: 12 },
    250: { stat: 17, att: 14 },
  };

  const { stat: baseStat, att: baseAtt } = post15[roundedLevel] || {
    stat: 0,
    att: 0,
  };

  const calculateStatsUpTo = (targetStar: number) => {
    let currentStat = 0;
    let currentAtt = 0;
    let attGain = 0;

    for (let star = 0; star <= targetStar; star++) {
      if (star < 5) {
        currentStat += 2;
      } else if (star < 15) {
        currentStat += 3;
      } else {
        currentStat += baseStat;
      }

      if (star === 16) {
        attGain = baseAtt;
        currentAtt += attGain;
      } else if (star >= 17 && star <= 20) {
        attGain += 1;
        currentAtt += attGain;
      } else if (star === 21) {
        attGain += 1;
        currentAtt += attGain;
      } else if (star >= 22) {
        attGain += 2;
        currentAtt += attGain;
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

  return { difference };
}
