import { _ } from "./deps.ts";
export type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades";

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

export interface Deck {
  countBySuit(): Partial<Record<Suit, number>>;
  countByRank(): Partial<Record<Rank, number>>;
}

export class PlayingDeck implements Deck {
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

  constructor() {
    PlayingDeck.suits.forEach((suit) => {
      PlayingDeck.ranks.forEach((rank) => {
        this.drawPile.push({ suit, rank });
      });
    });
    this.drawPile = _.shuffle(this.drawPile);
  }

  reShuffle(): void {
    this.drawPile = _.shuffle(this.discardPile);
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

  countByRank(): Partial<Record<Rank, number>> {
    const r = {} as Partial<Record<Rank, number>>;
    this.drawPile.forEach((card) => {
      r[card.rank] = (r[card.rank] || 0) + 1;
    });
    return r;
  }
}
