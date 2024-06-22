import { PlayingAgent } from "./agent.ts";
import { BaselineAgent } from "./agentImpl/baseline.ts";
import { Playground,} from "./playground.ts";

import {_} from "./deps.ts";
import { Qwen2Agent } from "./agentImpl/qwen2.ts";
import { GeminiAgent } from "./agentImpl/gemini.ts";
import { Claud3OpusAgent, Claude3Agent } from "./agentImpl/claude3.ts";
import { Gpt4Agent, Gpt4TurboAgent } from "./agentImpl/gpt4.ts";



type Result=number|"error";



async function runNTimes(agentFactory:()=>PlayingAgent,seedList:string[]):Promise<Result[]>{
  const resList:Result[]=[];
  for(let i=0;i<seedList.length;i++){
    const playground = new Playground(agentFactory(),seedList[i]);
    try{
      const score=await playground.playUntilOver();
      resList.push(score);
    }catch(err){
      console.log(err);
      resList.push("error");
    }
  }
  return resList;
}

// just make sure I did not use cherry-picked seeds
const randomSeedArr=["白", "日", "依", "山", "尽", "黄", "河", "入", "海", "流", "欲", "穷", "千", "里", "目", "更", "上", "一", "层", "楼"];

const resOfBaseline=await runNTimes(()=>new BaselineAgent(),randomSeedArr);
console.log("avg score for baseline: ",_.mean(resOfBaseline.filter(x=>_.isNumber(x))),resOfBaseline);

const resOfGpt4Turbo=await runNTimes(()=>new Gpt4TurboAgent(),randomSeedArr);
console.log("avg score for gpt4Turbo: ",_.mean(resOfGpt4Turbo.filter(x=>_.isNumber(x))),resOfGpt4Turbo);

const resOfOpusTurbo=await runNTimes(()=>new Claud3OpusAgent(),randomSeedArr);
console.log("avg score for claude3 opus: ",_.mean(resOfOpusTurbo.filter(x=>_.isNumber(x))),resOfOpusTurbo);

const resOfGemini=await runNTimes(()=>new GeminiAgent(),randomSeedArr);
console.log("avg score for gemini: ",_.mean(resOfGemini.filter(x=>_.isNumber(x))),resOfGemini);

const resOfClaude=await runNTimes(()=>new Claude3Agent(),randomSeedArr);
console.log("avg score for claude3: ",_.mean(resOfClaude.filter(x=>_.isNumber(x))),resOfClaude);

const resOfGpt=await runNTimes(()=>new Gpt4Agent(),randomSeedArr);
console.log("avg score for gpt4: ",_.mean(resOfGpt.filter(x=>_.isNumber(x))),resOfGpt);

const resOfQwen2=await runNTimes(()=>new Qwen2Agent(),randomSeedArr);
console.log("avg score for qwen2: ",_.mean(resOfQwen2.filter(x=>_.isNumber(x))),resOfQwen2);



