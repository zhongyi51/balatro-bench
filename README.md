# Balatro-Bench

### Introduction
This benchmark is inspired by the video game *Balatro* ([website](https://www.playbalatro.com/)), a playing-card based roguelike game.

In short, the objective for players in this game is to achieve the highest score by either *Discarding* or *Playing* cards. *Discarding* involves exchanging cards, while *Playing* earns points based on [card types](https://en.wikipedia.org/wiki/Texas_hold_%27em) in *Texas Hold'em*.

### Testing Details
The full system prompt is:

***
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
***

In each turn, the game history and the details of the deck will be shown to the model. All models have 3 Play and 3 Discard chances at the beginning.

All models share the same random seed (same cards during the whole game). The temperature of each model is set to 0, too.


### Testing results
The testing results (20 times) for the most popular models are below (higher is better):

| model     | score-avg  | score-detail                                                                                       |
|--------|-------|----------------------------------------------------------------------------------------------|
| baseline | 91.55 | 58, 59, 60, 61, 40, 82, 86, 90, 84, 70, 53, 84, 140, 338, 57, 96, 109, 140, 42, 82            |
| gemini (gemini-pro 1.5)   | 164.6 | 106, 106, 94, 0, 172, 136, 116, 174, 197, 220, 172, 168, 248, 394, 31, 190, 158, 236, 164, 210 |
| claude3 (claude3.5 sonnet)  | 252.6 | 284, 218, 282, 432, 356, 452, 98, 240, 117, 198, 216, 117, 388, 404, 148, 319, 89, 232, 146, 316 |
| gpt4 (gpt4o)    | 184.35| 110, 146, 114, 56, 210, 189, 136, 240, 205, 120, 228, 205, 330, 246, 100, 136, 280, 261, 176, 199 |
| qwen2 (qwen2-72b-instruct)    | 121.7 | 154, 160, 74, 288, 83, 82, 82, 242, 70, 92, 0, 10, 288, 193, 63, 0, 124, 172, 192, 65             |

### Run Your Own Tests

To run tests on your computer, follow these steps:

1. **Install [Deno](https://deno.com/):**
   ```sh
   curl -fsSL https://deno.land/install.sh | sh
   ```

2. **Apply Your OpenRouter API Key:**  
   Obtain an API key from OpenRouter.

3. **Set the Environment Variables:**  
   Assign your API key to the `OPENROUTER_API_KEY` environment variable.
   ```sh
   export OPENROUTER_API_KEY=your_api_key
   ```

4. **Run the Command:**  
   Execute the following command to run your script:
   ```sh
   deno run --allow-env --allow-net ./main.ts
   ```

To support additional models or agentic systems, implement the `PlayingAgent` interface in `agent.ts`.


# 中文版

### 介绍
这个测试方法受卡牌肉鸽游戏*Balatro*（[网站](https://www.playbalatro.com/)）启发。

简单来说，这款游戏中的目标是通过*弃牌*或*出牌*来获得尽量高的分数。*弃牌*就是单纯的换牌，而*出牌*则会根据*德州扑克*中的[牌型](https://en.wikipedia.org/wiki/Texas_hold_%27em)来算分。

### 测试详情
完整的system prompt如下（翻译后）：

***
你是一位经验丰富的纸牌游戏大师，精通各种纸牌游戏。

现在，有一个游戏，使用没有大小王的扑克牌。其规则如下：

1. 在游戏开始时，你手里有8张牌，并有一定次数出牌或弃牌机会。每回合，你可以执行以下操作之一：
   - 使用一次弃牌机会，弃置1到5张牌，并抽取相同数量的牌。
   - 使用一次出牌机会，打出1到5张牌。所打出的牌将根据**德州扑克的牌型排名**进行计分。

2. 当你打出牌时，计分公式为：[形成牌型的牌的总点数] * [牌型的倍数]。
   - 对于点数小于10的牌，它们的点数即为牌面值。对于10、J、Q、K，其点数固定为10。A的点数固定为11。
   - 不同牌型的倍数为：同花顺 - 8倍，四条 - 7倍，葫芦/同花/顺子 - 4倍，三条 - 3倍，一对/两对 - 2倍，高牌 - 1倍。

3. 执行操作时，先一步一步地分析你的手牌和牌堆中剩余的牌，然后再行动。你输出的最后一行应该是你决定执行的操作。首先用方括号标识的操作为Play或Discard，然后是冒号，紧接着你要打出或弃掉的牌，用空格分隔。每张牌的格式为花色-点数。以下是两个例子：
[Play]: Spades-3 Diamonds-2 Diamonds-10 Spades-J Hearts-A
[Discard]: Diamonds-J Hearts-2

4. 当你的出牌机会为0时，游戏结束。确保你的操作是**合法**的。如果输出的最后一行不符合格式，或者你使用了不存在的牌，游戏会立即结束。尽力在每次出牌中都打出尽可能高的牌型。
***

每个回合，游戏历史和牌堆的详细信息将显示给模型。所有模型在开始时都有3次出牌和3次弃牌机会。

所有的模型都共享相同的随机种子（整个游戏过程中的牌堆相同）。每个模型的温度也设置为0。

### 测试结果
以下是热门模型的测试结果（测试20次），分越高越好：

| 模型     | 平均分  | 分数详情                                                                                       |
|--------|-------|----------------------------------------------------------------------------------------------|
| baseline | 91.55 | 58, 59, 60, 61, 40, 82, 86, 90, 84, 70, 53, 84, 140, 338, 57, 96, 109, 140, 42, 82            |
| gemini (gemini-pro 1.5)   | 164.6 | 106, 106, 94, 0, 172, 136, 116, 174, 197, 220, 172, 168, 248, 394, 31, 190, 158, 236, 164, 210 |
| claude3 (claude3.5 sonnet)  | 252.6 | 284, 218, 282, 432, 356, 452, 98, 240, 117, 198, 216, 117, 388, 404, 148, 319, 89, 232, 146, 316 |
| gpt4 (gpt4o)    | 184.35| 110, 146, 114, 56, 210, 189, 136, 240, 205, 120, 228, 205, 330, 246, 100, 136, 280, 261, 176, 199 |
| qwen2 (qwen2-72b-instruct)    | 121.7 | 154, 160, 74, 288, 83, 82, 82, 242, 70, 92, 0, 10, 288, 193, 63, 0, 124, 172, 192, 65             |

### 运行其它模型

要在你的电脑上运行，请按照以下步骤：

1. **安装 [Deno](https://deno.com/):**
   ```sh
   curl -fsSL https://deno.land/install.sh | sh
   ```

2. **获取你自己的OpenRouter API密钥:**  
   从OpenRouter获取一个API密钥。

3. **设置环境变量:**  
   将环境变量`OPENROUTER_API_KEY`设置为你的密钥串。
   ```sh
   export OPENROUTER_API_KEY=your_api_key
   ```

4. **运行命令:**  
   执行以下命令：
   ```sh
   deno run --allow-env --allow-net ./main.ts
   ```

要支持额外的模型或代理系统的话，请实现`agent.ts`里的`PlayingAgent`接口。