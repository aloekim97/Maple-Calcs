export interface ProbabilityTiers {
  statPrime: number;
  allPrime: number;
  statNonPrime: number;
  allNonPrime: number;
}

export interface ItemProbabilities {
  stat: ProbabilityTiers;
  cooldown?: { [key: number]: number };
  critdamage?: { [key: number]: number };
  dropmeso?: { [key: number]: number };
}

export interface WSE {
  boss30?: number;
  boss35?: number;
  boss40?: number;
  ied30: number;
  ied35: number;
  ied40: number;
  att9: number;
  att12: number;
}

export interface CubeProbabilities {
  line1: number;
  line2: number;
  line3: number;
}

export const CUBE_PROBABILITIES = {
  black: {
    L: { line1: 1, line2: 0.2, line3: 0.05 },
    U: { line1: 1, line2: 0.8, line3: 0.95 },
  },
  red: {
    L: { line1: 1, line2: 0.1, line3: 0.01 },
    U: { line1: 1, line2: 0.9, line3: 0.99 },
  },
};

export const CUBE_COST: { [key: string]: number } = {
  black: 22000000,
  red: 12000000,
};

export const lPrime: { [key: string]: number[] } = {
  low: [12, 9],
  high: [13, 10],
};

export const uPrime: { [key: string]: number[] } = {
  low: [9, 6],
  high: [10, 7],
};

export const WSE_PROBABILITIES: { [key: string]: WSE } = {
  weapon: {
    boss30: 6.66,
    boss35: 9.756,
    boss40: 4.878,
    ied30: 6.66,
    ied35: 4.878,
    ied40: 4.878,
    att9: 6.66,
    att12: 4.878,
  },
  emblem: {
    ied30: 7.5,
    ied35: 5.714,
    ied40: 5.714,
    att9: 7.5,
    att12: 5.714,
  },
  secondary: {
    boss30: 5.882,
    boss35: 8.51,
    boss40: 4.255,
    ied30: 5.882,
    ied35: 4.255,
    ied40: 4.255,
    att9: 5.882,
    att12: 4.255,
  },
};

export const ITEM_PROBABILITIES: { [key: string]: ItemProbabilities } = {
  Hat: {
    stat: {
      statPrime: 9.76,
      allPrime: 7.32,
      statNonPrime: 9.61,
      allNonPrime: 7.69,
    },
    cooldown: {
      1: 7.32,
      2: 4.88,
    },
  },
  Top: {
    stat: {
      statPrime: 10.3,
      allPrime: 7.69,
      statNonPrime: 8.06,
      allNonPrime: 6.45,
    },
  },
  Bottom: {
    stat: {
      statPrime: 12.1,
      allPrime: 9.09,
      statNonPrime: 9.62,
      allNonPrime: 7.69,
    },
  },
  Gloves: {
    stat: {
      statPrime: 10,
      allPrime: 7.5,
      statNonPrime: 8.9,
      allNonPrime: 7.14,
    },
    critdamage: {
      1: 10,
    },
  },
  Shoes: {
    stat: {
      statPrime: 11.11,
      allPrime: 8.33,
      statNonPrime: 9.61,
      allNonPrime: 7.69,
    },
  },
  //Cape, belt, shoulder
  Cape: {
    stat: {
      statPrime: 12.12,
      allPrime: 9.09,
      statNonPrime: 10.41,
      allNonPrime: 8.33,
    },
  },
  Accessory: {
    stat: {
      statPrime: 10.25,
      allPrime: 7.69,
      statNonPrime: 12.48,
      allNonPrime: 10,
    },
    dropmeso: {
      1: 7.69,
    },
  },
  //heart and badge
  Heart: {
    stat: {
      statPrime: 14.81,
      allPrime: 11.11,
      statNonPrime: 12.48,
      allNonPrime: 33.33,
    },
  },
};
