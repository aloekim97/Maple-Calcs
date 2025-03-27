export interface ProbabilityTiers {
  statPrime: number;
  allPrime: number;
  statNonPrime: number;
  allNonPrime: number;
}

export interface ItemProbabilities {
  stat: ProbabilityTiers;
  cooldown?: {
    1: number;
    2: number;
  };
  critdamage?: {
    1: number;
  };
  dropmeso?: {
    1: number;
  };
}

export interface WSE {
  Boss30?: number;
  Boss35?: number;
  Boss40?: number;
  ied30: number;
  ied35: number;
  ied40: number;
  att9: number;
  att12: number;
}

export const WSE_PROBABILITIES: { [key: string]: WSE } = {
  weapon: {
    Boss30: 6.66,
    Boss35: 9.756,
    Boss40: 4.878,
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
    Boss30: 5.882,
    Boss35: 8.51,
    Boss40: 4.255,
    ied30: 5.882,
    ied35: 4.255,
    ied40: 4.255,
    att9: 5.882,
    att12: 4.255,
  },
};

export const ITEM_PROBABILITIES: { [key: string]: ItemProbabilities } = {
  hat: {
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
  top: {
    stat: {
      statPrime: 10.3,
      allPrime: 7.69,
      statNonPrime: 8.06,
      allNonPrime: 6.45,
    },
  },
  pants: {
    stat: {
      statPrime: 12.1,
      allPrime: 9.09,
      statNonPrime: 9.62,
      allNonPrime: 7.69,
    },
  },
  glove: {
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
  shoes: {
    stat: {
      statPrime: 11.11,
      allPrime: 8.33,
      statNonPrime: 9.61,
      allNonPrime: 7.69,
    },
  },
  //Cape, belt, shoulder
  cape: {
    stat: {
      statPrime: 12.12,
      allPrime: 9.09,
      statNonPrime: 10.41,
      allNonPrime: 8.33,
    },
  },
  accessory: {
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
  heart: {
    stat: {
      statPrime: 14.81,
      allPrime: 11.11,
      statNonPrime: 12.48,
      allNonPrime: 33.33,
    },
  },
  weapon: {
    stat: {
      statPrime: 14.81,
      allPrime: 11.11,
      statNonPrime: 12.48,
      allNonPrime: 33.33,
    },
  },
};
