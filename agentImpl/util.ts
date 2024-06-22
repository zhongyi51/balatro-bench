


type Chat={role:"system"|"user"|"assistant",content:string};

const apiKey=Deno.env.get("OPENROUTER_API_KEY");

//use openrouter
export async function doLlmReq(history:Chat[],model:string):Promise<void> {
const res=await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "HTTP-Referer": `balatro-bench`, 
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": model,
    "messages": history,
  })
});
console.log(await res.json());
}