
import { _ } from "../deps.ts";
import { CommonOpenRouterAgent } from "./common.ts";

export class Gpt4Agent extends CommonOpenRouterAgent{
    constructor(){
        super("openai/gpt-4o");
    }
}

export class Gpt4TurboAgent extends CommonOpenRouterAgent{
    constructor(){
        super("openai/gpt-4-turbo");
    }
}