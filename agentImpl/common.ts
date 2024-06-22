import { PlayingAgent } from "../agent.ts";
import { Card, PlayingDeck } from "../cards.ts";
import { Action } from "../rules.ts";
import { Chat, concatCurrentInfo, doLlmReq, extractAction, systemPrompt } from "./util.ts";
import {_} from "../deps.ts";


export class CommonOpenRouterAgent implements PlayingAgent {
  static systemPrompt: string = systemPrompt;

  history: Chat[] = [{role:"system",content:CommonOpenRouterAgent.systemPrompt}];

  modelName:string;

  constructor(modelName:string){
    this.modelName = modelName;
  }

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
    const newInfo:Chat={
      role: "user",
      content: concatCurrentInfo(
        hands,
        remainHandCount,
        remainDiscardCount,
        deck,
      ),
    };
    this.history.push(newInfo);
    const res = await doLlmReq([...this.history], this.modelName);
    if (_.isNil(res)) {
      throw new Error("request failed");
    }
    const action = extractAction(res.content);
    if (_.isNil(action)) {
      throw new Error(`action not valid: ${res.content}`);
    }
    this.history.push(res);
    return action;
  }
}
