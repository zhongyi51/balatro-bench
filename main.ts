import { BaselineAgent } from "./agentImpl/baseline.ts";
import { Gpt4Agent } from "./agentImpl/gpt4.ts";
import { Playground, includeAll } from "./playground.ts";



const playground = new Playground(new Gpt4Agent());
await playground.playUntilOver();


const playground2 = new Playground(new BaselineAgent());
await playground2.playUntilOver();
