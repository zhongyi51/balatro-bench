import { CommonOpenRouterAgent } from "./common.ts";

export class Qwen2Agent extends CommonOpenRouterAgent{
    constructor(){
        super("qwen/qwen-2-72b-instruct");
    }
}