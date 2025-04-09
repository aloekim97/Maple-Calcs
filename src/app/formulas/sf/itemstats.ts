export default function itemStats(
  start: number,
  end: number,
  equipLevel: number,
  weaponAtt?: any,
  type?: any
): {
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

  const weaponPost15: { [key: number]: { stat: number; att: number } } = {
    130: { stat: 7, att: 6 },
    140: { stat: 9, att: 7 },
    150: { stat: 11, att: 8 },
    160: { stat: 13, att: 9 },
    200: { stat: 15, att: 13 },
    250: { stat: 17, att: 14 },
  };

  const { stat: baseStat, att: baseAtt } = post15[roundedLevel] || {
    stat: 0,
    att: 0,
  };
  const { stat: wpnStat, att: wpnAtt } = weaponPost15[roundedLevel] || {
    stat: 0,
    att: 0,
  };

  const calculateStatsUpTo = (targetStar: number) => {
    if (type === 'Weapon')
      return weaponSf(targetStar, weaponAtt); // Fixed: Pass equip here
    else return equipSf(targetStar);
  };

  const weaponSf = (targetStar: number, weaponAtt: any) => {
    let currentStat = 0;
    let totalAtt = 0;
    let attCount = 0;
    let post15 = wpnAtt;

    for (let star = 1; star <= targetStar; star++) {
      if (star >= 1 && star <= 22) {
        if (star === 1) {
          currentStat += 2;
          attCount += Math.round(weaponAtt * 0.02);
          console.log(attCount);
          totalAtt += attCount + weaponAtt;
        } else if (star <= 5) {
          currentStat += 2;
          attCount += Math.round(totalAtt * 0.02);
          totalAtt += attCount;
        } else if (star <= 15) {
          currentStat += 3;
          attCount += Math.round(totalAtt * 0.02);
          totalAtt += attCount;
        } else {
          currentStat += baseStat; // Changed from baseStat to wpnStat
        }
      }

      if (star === 16) {
        attCount += wpnAtt;
        post15 += 1;
      } else if (star === 17) {
        attCount += post15;
      } else if (star === 18) {
        attCount += post15;
        post15 += 1;
      } else if (star <= 22) {
        // attCount += post15;
        post15 += 1;
      }
    }
    return {
      stat: currentStat,
      att: attCount,
    };
  };

  const equipSf = (targetStar: number) => {
    let currentStat = 0;
    let currentAtt = 0;
    let attCount = 0;

    for (let star = 0; star <= targetStar; star++) {
      if (star >= 1 && star <= 22) {
        if (star <= 5) {
          currentStat += 2;
        } else if (star <= 15) {
          currentStat += 3;
        } else {
          currentStat += baseStat;
        }
      }

      if (star === 16) {
        currentAtt += baseAtt;
        attCount = baseAtt + 1;
      } else if (star >= 17 && star <= 20) {
        currentAtt += attCount;
        attCount += 1;
      } else if (star === 21) {
        currentAtt += attCount;
        attCount += 2;
      } else if (star >= 22) {
        currentAtt += attCount;
        attCount += 2;
      }
    }
    return {
      stat: currentStat,
      att: currentAtt,
    };
  };

  const currentStats = calculateStatsUpTo(start);
  const additionalStats = calculateStatsUpTo(end);

  return {
    difference: {
      stat: additionalStats.stat - currentStats.stat,
      att: additionalStats.att - currentStats.att,
    },
  };
}
