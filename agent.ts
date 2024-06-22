import { Card, PlayingDeck } from "./cards.ts";
import { Action } from "./rules.ts";

export interface PlayingAgent {
  init(handCount: number, discardCount: number, deck: PlayingDeck): void;

  doAction(
    hands: readonly Card[],
    score: number,
    remainHandCount: number,
    remainDiscardCount: number,
    deck: PlayingDeck,
  ): Action;
}
