import { _,seedrandom } from "./deps.ts";
export type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades";


export function seedShuffle<T>(array:readonly T[],seed:string):T[] {
    const rng = seedrandom(seed);
    const result = array.slice();

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export type Card = {
  suit: Suit;
  rank: Rank;
};

export class PlayingDeck {
  static suits: Suit[] = ["Hearts", "Diamonds", "Clubs", "Spades"];
  static ranks: Rank[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  drawPile: Card[] = [];
  discardPile: Card[] = [];

  seed:string;

  constructor(seed:string) {
    PlayingDeck.suits.forEach((suit) => {
      PlayingDeck.ranks.forEach((rank) => {
        this.drawPile.push({ suit, rank });
      });
    });
    this.seed=seed;
    this.drawPile = seedShuffle(this.drawPile,this.seed);
  }

  reShuffle(): void {
    this.drawPile = seedShuffle(this.discardPile,this.seed);
    this.discardPile = [];
  }

  drawOne(): Card {
    if (_.isEmpty(this.drawPile)) {
      this.reShuffle();
    }
    const nextCard = this.drawPile.pop();
    if (_.isNil(nextCard)) {
      throw new Error("draw pile is empty");
    }
    return nextCard;
  }

  drawN(n: number): Card[] {
    const res = [];
    for (let i = 0; i < n; i++) {
      res.push(this.drawOne());
    }
    return res;
  }

  discard(cards: Card[]): void {
    this.discardPile.push(...cards);
  }

  countBySuit(): Partial<Record<Suit, number>> {
    const r = {} as Partial<Record<Suit, number>>;
    this.drawPile.forEach((card) => {
      r[card.suit] = (r[card.suit] || 0) + 1;
    });
    return r;
  }

  countBySuitPretty(): string {
    const r = this.countBySuit();
    const sorted = _.sortBy(Object.entries(r), ([k, v]) => k);
    const infoStr = _.join(
      _.map(sorted, ([k, v]) => `Suit ${k} - ${v} cards;`),
      " ",
    );
    return infoStr;
  }

  countByRankPretty(): string {
    const r = this.countByRank();
    const sorted = _.sortBy(Object.entries(r), ([k, v]) => k);
    const infoStr = _.join(
      _.map(sorted, ([k, v]) => `Rank ${k} - ${v} cards;`),
      " ",
    );
    return infoStr;
  }

  countByRank(): Partial<Record<Rank, number>> {
    const r = {} as Partial<Record<Rank, number>>;
    this.drawPile.forEach((card) => {
      r[card.rank] = (r[card.rank] || 0) + 1;
    });
    return r;
  }
}
