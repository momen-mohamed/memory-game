"use strict";
import Card from "./card_model.js";

export default class GameBrain {
  constructor(numberofcards, difficulty) {
    this.availableOptions = [
      "🐸",
      "🐼",
      "🐵",
      "🐷",
      "🐌",
      "🐙",
      "🐠",
      "🐲",
      "🦜",
    ];
    this.numberofcards = numberofcards;
    this.choosenTimer =
      difficulty == "Easy" ? 100 : difficulty == "Medium" ? 60 : 30;
    this.shuffledArray = [];
    this.started = false;
    this.seconds = this.choosenTimer;
    this.timeCount;
    this.openedCardsList = [];
    this.matchedCardNumbers = 0;
    this.movesCount = 0; // Number of moves made(clicks on card)
  }

  get isWinner() {
    return this.matchedCardNumbers == this.shuffledArray.length;
  }

  get moves() {
    return this.movesCount;
  }
  get cards() {
    // get copy of shuffled array in order to prevent mutating the state from out side of the model
    return this.shuffledArray.slice(0);
  }

  get openedCards() {
    return this.openedCardsList.slice(0);
  }

  initGame() {
    let availabeCards = [];

    console.log(this.numberofcards);
    let counter = 0;
    for (let index = 0; index < this.numberofcards; index++) {
      let card = new Card(index, counter, this.availableOptions[counter]);
      console.log(card);
      if (index % 2 != 0) {
        counter++;
      }
      availabeCards.push(card);
    }
    console.log(availabeCards);
    this.shuffledArray = this.shuffle(availabeCards.slice(0));
  }

  flipCard(cardId) {
    let index = this.shuffledArray.findIndex((card) => card.id === cardId);
    this.shuffledArray[index].isFlipped = true;
    let flippedCards = this.shuffledArray.filter(
      (card) => card.isFlipped === true
    );
    if (flippedCards.length == 2) {
      this.movesCount++;
      console.log("two card are flipped");
      this.openedCardsList = flippedCards.slice(0);
      return true;
    } else {
      return false;
    }
  }

  checkmatch(card1, card2, winnerCallBack) {
    this.openedCardsList = [];
    let index1 = this.shuffledArray.findIndex((card) => card.id === card1.id);
    let index2 = this.shuffledArray.findIndex((card) => card.id === card2.id);

    if (card1.type === card2.type) {
      this.shuffledArray[index1].isFlipped = false;
      this.shuffledArray[index2].isFlipped = false;
      this.shuffledArray[index1].isMatched = true;
      this.shuffledArray[index2].isMatched = true;
      console.log(this.shuffledArray, "our state");
      this.matchedCardNumbers += 2;

      if (this.matchedCardNumbers === this.shuffledArray.length) {
        console.log("wahooooooo winner");
        this.stopTimer();
        winnerCallBack();
      }
      return true;
    } else {
      this.shuffledArray[index1].isFlipped = false;
      this.shuffledArray[index2].isFlipped = false;
      console.log(this.shuffledArray, "our state");
      return false;
    }
  }

  stopTimer() {
    clearInterval(this.timeCount);
    this.started = false;
  }

  shuffle(array) {
    let shuffledArray = array.slice(0);
    let current = array.length,
      temp,
      random;
    while (current > 0) {
      random = Math.floor(Math.random() * current);
      current--;
      temp = shuffledArray[current];
      shuffledArray[current] = shuffledArray[random];
      shuffledArray[random] = temp;
    }
    return shuffledArray;
  }

  resetGame() {
    clearInterval(this.timeCount);
    this.shuffledArray = [];
    this.started = false;
    this.seconds = this.choosenTimer;
    this.timeCount;
    this.openedCardsList = [];
    this.matchedCardNumbers = 0;
    this.movesCount = 0;
  }

  startTimer(timerCallBack, failCallback) {
    if (this.started === false) {
      console.log("one time timer");
      this.timeCount = setInterval(() => {
        this.seconds -= 1;
        timerCallBack(this.seconds);
        if (this.seconds == 0) {
          this.stopTimer();
          failCallback();
        }
      }, 1000);
      this.started = true;
    }
  }
}
