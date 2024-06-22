
import { CommonOpenRouterAgent } from "./common.ts";

export class Claude3Agent extends CommonOpenRouterAgent{
    constructor(){
        super("anthropic/claude-3.5-sonnet");
    }
}

export class Claud3OpusAgent extends CommonOpenRouterAgent{
    constructor(){
        super("anthropic/claude-3-opus");
    }
}