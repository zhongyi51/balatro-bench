import {_} from "./deps.ts"

  export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';

  export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

  export type Card = {
    suit: Suit;
    rank: Rank;
  };

  export interface Deck{
    countBySuit():Partial<Record<Suit,number>>;
    countByRank():Partial<Record<Rank,number>>;
  };

  export class PlayingDeck implements Deck{

    static suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    static ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
 
    drawPile:Card[]=[];
    discardPile:Card[]=[];

    constructor(){
        PlayingDeck.suits.forEach(suit =>{
            PlayingDeck.ranks.forEach(rank=>{
                this.drawPile.push({suit,rank})
            });
        });
        _.shuffle(this.drawPile);
    }

    reShuffle():void{
        this.drawPile=_.shuffle(this.discardPile);
        this.discardPile=[];
    }

    countBySuit(): Partial<Record<Suit, number>> {
      const r={} as Partial<Record<Suit, number>>;
      this.drawPile.forEach(card=>{
        r[card.suit]=(r[card.suit]||0 + 1);
      });
      return r;
    }

    countByRank(): Partial<Record<Rank, number>> {
        const r={} as Partial<Record<Rank, number>>;
        this.drawPile.forEach(card=>{
            r[card.rank]=(r[card.rank]||0 +1);
        });
        return r;
    }

  }
