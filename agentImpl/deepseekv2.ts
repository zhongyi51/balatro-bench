
import { CommonOpenRouterAgent } from "./common.ts";

export class DeepSeekV2Agent extends CommonOpenRouterAgent{
    constructor(){
        super("deepseek/deepseek-chat");
    }
}