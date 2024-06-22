
import { CommonOpenRouterAgent } from "./common.ts";

export class Claude3Agent extends CommonOpenRouterAgent{
    constructor(){
        super("anthropic/claude-3.5-sonnet");
    }
}