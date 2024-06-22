import { BaselineAgent } from "./agentImpl/baseline.ts";
import { doLlmReq } from "./agentImpl/util.ts";
import { Playground } from "./playground.ts";

export function add(a: number, b: number): number {
  return a + b;
}

const playground = new Playground(new BaselineAgent());
await playground.playUntilOver();

const res=await doLlmReq([{role:"system",content:"Just say hello."}],"openai/gpt-3.5-turbo");
console.log(res);