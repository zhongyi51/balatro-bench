import { PlayingAgent } from "./agent.ts";
import { Card, PlayingDeck } from "./cards.ts";
import { calPlayScore } from "./rules.ts";

import { _ } from "./deps.ts";

export function includeAll<T>(array1: T[], array2: T[]) {
  return _.every(array2, (element) => _.some(array1, (e) => _.isEqual(e, element)));
}

export function formatCards(cards: readonly Card[]): string {
  return _.join(_.map(cards, (card) => `${card.suit}-${card.rank}`), " ");
}

export class Playground {
  deck: PlayingDeck = new PlayingDeck();

  score: number = 0;

  hands: Card[] = [];

  playingAgent: PlayingAgent;

  handCount: number = 3;

  discardCount: number = 3;

  isOver: boolean = false;

  debugHistory: string[] = [];

  constructor(playingAgent: PlayingAgent) {
    this.playingAgent = playingAgent;
    this.playingAgent.init(this.handCount, this.discardCount, this.deck);
    this.hands = this.deck.drawN(8);
  }

  async oneTurn() {
    if (this.isOver) {
      return;
    }

    this.debugHistory.push(
      `New turn start. Current hands: ${formatCards(this.hands)}`,
    );

    const action = await this.playingAgent.doAction(
      this.hands,
      this.score,
      this.handCount,
      this.discardCount,
      this.deck,
    );

    if (!includeAll(this.hands, action.card)) {
      this.debugHistory.push(
        `Inexist card shows in action ${action.type}: ${
          formatCards(action.card)
        } <--> ${formatCards(this.hands)}`,
      );
      this.isOver = true;
      return;
    }

    if (action.type === "Play") {
      const [typeInfo, curScore, scoredCards] = calPlayScore(action.card);
      this.score += curScore;
      this.handCount -= 1;
      this.debugHistory.push(
        `Playing card type ${typeInfo.typeName}:${
          formatCards(scoredCards)
        } add score ${curScore}`,
      );
    } else if (action.type === "Discard") {
      this.debugHistory.push(`Discard ${formatCards(action.card)}`);
      this.discardCount -= 1;
    }

    this.deck.discard(action.card);
    this.hands = _.filter(this.hands, (hand) => !_.includes(action.card, hand));
    this.hands.push(...this.deck.drawN(action.card.length));

    if (this.handCount === 0) {
      this.debugHistory.push(
        `Hand count become zero, game over. Final score: ${this.score}`,
      );
      this.isOver = true;
    }
  }

  async playUntilOver(): Promise<number> {
    while (!this.isOver) {
      await this.oneTurn();
    }
    for (const his of this.debugHistory) {
      console.log(his);
    }
    return this.score;
  }
}
