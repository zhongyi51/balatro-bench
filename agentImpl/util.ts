import { Card, PlayingDeck, Rank, Suit } from "../cards.ts";
import { formatCards } from "../playground.ts";
import { Action } from "../rules.ts";

import {_} from "../deps.ts";

export type Chat = { role: "system" | "user" | "assistant"; content: string };

const apiKey = Deno.env.get("OPENROUTER_API_KEY");

//use openrouter
export async function doLlmReq(history: Chat[], model: string): Promise<Chat> {
  const bodyStr = JSON.stringify({
    "model": model,
    "messages": history,
    "temperature":0
  });
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": `balatro-bench`,
      "Content-Type": "application/json",
    },
    body: bodyStr,
  });
  const json = await res.json();
  return json["choices"][0]["message"];
}

const actionPattern = /\[([^\]]+)\]:\s+(.+)/;
export function extractAction(content: string): Action | null {
  const lastLine = content.split("\n").filter(line=>!_.isEmpty(line) && actionPattern.test(line)).slice(-1)[0];
  const match = lastLine.match(actionPattern);
  if (match) {
    const actionType = match[1];
    const cards = match[2].trim().split(" ")
      .map((cardStr) => {
        const segs = cardStr.split("-");
        return {
          suit: segs[0] as Suit,
          rank: segs[1] as Rank,
        };
      });
    if (actionType === "Play" || actionType === "Discard") {
      return {
        type: actionType,
        card: cards,
      };
    }
  }
  return null;
}

export const systemPrompt = `
You are a seasoned card game master, proficient in various card games.

Now, there is a game that relies on a deck of cards without jokers. The rules are as follows:

1. At the start of the game, you have 8 cards in your hand, and a certain number of chances to play or discard cards. You can perform one of the following actions:
   - Use a discard chance to discard between 1 and 5 cards, and draw the same number of cards.
   - Use a play chance to play between 1 and 5 cards. The played cards will be scored according to **Texas Hold'em hand rankings**.

2. When you play cards, the scoring formula is: [total points of the cards forming the hand] * [multiplier of the hand type].
   - For cards below 10, their points are their face values. For 10, J, Q, K, their points are fixed at 10. A has a fixed point value of 11.
   - The multipliers for different hand types are: Straight Flush - 8x, Four of a Kind - 7x, Full House/Flush/Straight - 4x, Three of a Kind - 3x, One Pair/Two Pair - 2x, High Card - 1x.

3. When you perform an action, first analyze your hand and the remaining cards step by step, and then make your move. The last line of your output should be the action you decide to perform. First, indicate your action in square brackets as either Play or Discard, followed by a colon and the cards you are playing or discarding, separated by spaces. The format for each card is suit-dash-rank. Do not use any markdown for the last line. Here are two examples:
[Play]: Spades-3 Diamonds-2 Diamonds-10 Spades-J Hearts-A
[Discard]: Diamonds-J Hearts-2

4. The game ends when your play chances reach 0. Ensure that your actions are **legal**. If the last line of your output does not follow the format, or if you use non-existent cards, the game will end immediately. Strive to achieve the highest card type for each play.
`;

export function concatCurrentInfo(
  hands: readonly Card[],
  remainHandCount: number,
  remainDiscardCount: number,
  deck: PlayingDeck,
): string {
  const curInfo = `
Your current hand: ${formatCards(hands)}
Remaining plays: ${remainHandCount}
Remaining discards: ${remainDiscardCount}
Remaining cards in the deck distribution:
By suit: ${deck.countBySuitPretty()}
By rank: ${deck.countByRankPretty()}`;
  return curInfo;
}
