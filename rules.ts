import { _ } from "./deps.ts";
import { Card, Rank } from "./cards.ts";

export type Play = {
  type: "Play";
  card: Card[];
};

export type Discard = {
  type: "Discard";
  card: Card[];
};

export type Action = Play | Discard;

export const HighCard = {
  typeName: "High Card",
  power: 1,
};

export const Pair = {
  typeName: "Pair",
  power: 2,
};

export const TwoPair = {
  typeName: "Two Pair",
  power: 2,
};

export const ThreeOfAKind = {
  typeName: "Three Of A Kind",
  power: 3,
};

export const Straight = {
  typeName: "Straight",
  power: 4,
};

export const Flush = {
  typeName: "Flush",
  power: 4,
};

export const FullHouse = {
  typeName: "Full House",
  power: 4,
};

export const FourOfAKind = {
  typeName: "Four Of A Kind",
  power: 7,
};

export const StraightFlush = {
  typeName: "Straight Flush",
  power: 8,
};

export type CardType = {
  typeName: string;
  power: number;
};

function isConsecutive(cards: Card[]): boolean {
  if (cards.length <= 1) {
    return true;
  }

  const sorted = _.sortBy(cards, "rank");

  const prev = sorted[0];
  for (let i = 1; i < cards.length; i++) {
    const thisCard = sorted[i];
    if (prev.rank + 1 !== thisCard.rank) {
      return false;
    }
  }
  return true;
}

export function calPlayType(cards: Card[]): [CardType, Card[]] {
  const consecutive = isConsecutive(cards);
  const size = cards.length;

  const isSingleSuit = _.uniqBy(cards, (card) => card.suit).length === 1;
  const isFiveCard = size === 5;

  if (consecutive && isSingleSuit && isFiveCard) {
    return [StraightFlush, cards];
  }

  if (consecutive && isFiveCard) {
    return [Straight, cards];
  }

  if (isSingleSuit && isFiveCard) {
    return [Flush, cards];
  }

  const rankMap = _.groupBy(cards, (card) => card.rank);

  const fourTimeEntries = Object.entries(rankMap)
    .filter(([k, v]) => {
      return v.length === 4;
    });

  const threeTimeEntries = Object.entries(rankMap)
    .filter(([k, v]) => {
      return v.length === 3;
    });

  const twoTimeEntries = Object.entries(rankMap)
    .filter(([k, v]) => {
      return v.length === 2;
    });

  if (fourTimeEntries.length === 1) {
    return [FourOfAKind, fourTimeEntries[0][1]];
  }

  if (threeTimeEntries.length === 1 && twoTimeEntries.length === 1) {
    return [FullHouse, [...threeTimeEntries[0][1], ...twoTimeEntries[0][1]]];
  }

  if (threeTimeEntries.length === 1) {
    return [ThreeOfAKind, threeTimeEntries[0][1]];
  }

  if (twoTimeEntries.length === 2) {
    return [TwoPair, [...twoTimeEntries[0][1], ...twoTimeEntries[1][1]]];
  }

  if (twoTimeEntries.length === 1) {
    return [Pair, twoTimeEntries[0][1]];
  }

  const sorted = _.sortBy(cards, (card) => card.rank);
  return [HighCard, [sorted[sorted.length - 1]]];
}

export const rankScores: Record<Rank, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 10,
  "Q": 10,
  "K": 10,
  "A": 11,
};

export function calPlayScore(cards: Card[]): [CardType, number, Card[]] {
  if (_.isEmpty(cards)) {
    throw new Error("No cards");
  }
  const [type, cardArr] = calPlayType(cards);

  return [
    type,
    _.sumBy(cardArr, (card) => rankScores[card.rank]) * type.power,
    cardArr,
  ];
}
