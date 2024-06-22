import { PlayingAgent } from "../agent.ts";
import { PlayingDeck, Card } from "../cards.ts";
import { Action } from "../rules.ts";

import {_} from "../deps.ts";


export class BaselineAgent implements PlayingAgent{
  init(handCount: number, discardCount: number, deck: PlayingDeck): void {
    //noop
  }
  async doAction(hands: readonly Card[], score: number, remainHandCount: number, remainDiscardCount: number, deck: PlayingDeck): Promise<Action> {
    //check flush first
    const sorted=_.sortBy(hands,"suit");
    if(_.uniqBy(sorted.slice(-5),card=>card.suit).length===1){
        return {
            type:"Play",
            card:sorted.slice(-5)
        }
    }

    //otherwise select highest five
    const sorted2=_.sortBy(hands,"rank");
    return {
        type:"Play",
        card:sorted2.slice(-5)
    }
  }

}