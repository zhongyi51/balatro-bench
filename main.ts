import { PlayingDeck } from "./cards.ts";

export function add(a: number, b: number): number {
  return a + b;
}

const deck = new PlayingDeck();
const cards = deck.drawN(8);
console.log(cards);
