"use strict";


//model 
class Card {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

let ourCards = [
  new Card(1, "ninja"),
  new Card(1, "ninja"),
  new Card(2, "elephant"),
  new Card(2, "elephant"),
  new Card(3, "tiger"),
  new Card(3, "tiger"),
  new Card(4, "lion"),
  new Card(4, "lion"),
];

let gameContainer = document.querySelector(".main");

function initializeGame() {
  for (let index = 0; index < ourCards.length; index++) {
    let mainCardContainer = document.createElement("div");
    let card = document.createElement("div");
    let frontFace = document.createElement("div");
    let backFace = document.createElement("div");
    mainCardContainer.classList.add("flip-container");
    card.className = "flipper";
    frontFace.className = "front";
    backFace.className = "back";
    card.id = ourCards[index].id;
    card.appendChild(frontFace);
    card.appendChild(backFace);
    mainCardContainer.appendChild(card);
    gameContainer.appendChild(mainCardContainer);
  }
}

initializeGame();
console.log(gameContainer);

let cards = Array.from(document.querySelector(".main").children);
console.log(cards);

cards.forEach(function (card) {
    card.addEventListener("mouseover", function () {
      cardMouseOver(card);
    });

    card.addEventListener("mouseleave", function () {
      cardMouseLeave(card);
    });
  card.addEventListener("click", function () {
    flipCard(card);
  });
});

function flipCard(selectedCard) {
  // add is flipped class
  selectedCard.querySelector(".flipper").classList.toggle("is-flipped");

  // filter flipped card

  let flippedCards = Array.from(
    document.querySelectorAll(".flipper")
  ).filter((card) => card.classList.contains("is-flipped"));

  if (flippedCards.length == 2) {
    console.log("two card are flipped");
    checkmatch(flippedCards[0], flippedCards[1]);
  }

  // now we have to stop card from being clicked again
}

function checkmatch(card1, card2) {
  if (card1.id === card2.id) {
    console.log("matched");
  } else {
    console.log("not matched");
  }
}
function cardMouseOver(selectedCard) {
  if (
    !selectedCard.querySelector(".flipper").classList.contains("is-flipped")
  ) {
    selectedCard.querySelector(".flipper").classList.add("is-hovered");
  }
}

function cardMouseLeave(selectedCard) {
  if (
    !selectedCard.querySelector(".flipper").classList.contains("is-flipped")
  ) {
    selectedCard.querySelector(".flipper").classList.remove("is-hovered");
  }
}
