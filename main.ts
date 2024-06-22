import { PlayingAgent } from "./agent.ts";
import { Card, PlayingDeck } from "./cards.ts";
import { Playground } from "./playground.ts";
import { Action, calPlayScore } from "./rules.ts";

export function add(a: number, b: number): number {
  return a + b;
}

const mockPlayingAgent: PlayingAgent = {
  init: function (
    handCount: number,
    discardCount: number,
    deck: PlayingDeck,
  ): void {
    //noop
  },
  doAction: function (
    hands: readonly Card[],
    score: number,
    remainHandCount: number,
    remainDiscardCount: number,
    deck: PlayingDeck,
  ): Action {
    //just select first five cards;
    return {
      type: "Play",
      card: hands.slice(0, 5),
    };
  },
};

const playground = new Playground(mockPlayingAgent);
playground.playUntilOver();
