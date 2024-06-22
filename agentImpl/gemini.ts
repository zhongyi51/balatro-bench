
import { _ } from "../deps.ts";
import { CommonOpenRouterAgent } from "./common.ts";

export class GeminiAgent extends CommonOpenRouterAgent{
    constructor(){
        super("google/gemini-pro-1.5");
    }
}