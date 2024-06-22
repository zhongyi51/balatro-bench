import { PlayingAgent } from "../agent.ts";
import { Card, PlayingDeck } from "../cards.ts";
import { formatCards } from "../playground.ts";
import { Action } from "../rules.ts";
import {
  Chat,
  concatCurrentInfo,
  doLlmReq,
  extractAction,
  systemPrompt,
} from "./util.ts";

import { _ } from "../deps.ts";

export class Gpt4Agent implements PlayingAgent {
  static systemPrompt: string = systemPrompt;

  history: Chat[] = [{role:"system",content:Gpt4Agent.systemPrompt}];

  init(handCount: number, discardCount: number, deck: PlayingDeck): void {
    //noop
  }

  async doAction(
    hands: readonly Card[],
    score: number,
    remainHandCount: number,
    remainDiscardCount: number,
    deck: PlayingDeck,
  ): Promise<Action> {
    const res = await doLlmReq([...this.history, {
      role: "user",
      content: concatCurrentInfo(
        hands,
        remainHandCount,
        remainDiscardCount,
        deck,
      ),
    }], "openai/gpt-4o");
    if (_.isNil(res)) {
      throw new Error("request failed");
    }
    const action = extractAction(res.content);
    if (_.isNil(action)) {
      throw new Error(`action not valid: ${res.content}`);
    }
    return action;
  }
}
