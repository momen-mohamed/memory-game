"use strict";
import GameBrain from "../model/game_brain.js";

let gameContainer = document.querySelector(".game-container");
let movesSpan = document.getElementById("moves-made");
const infobar = document.querySelector(".information-bar");
const stars = document.querySelectorAll("li i");
const setTimeOutDuration = 600;
const restartButton = document.getElementById("restart");
let difficulty = "Easy";
let numberOfCard = "9";

let gameBrain = new GameBrain();
////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function () {
  let overlay = createStartModal();
  document.body.appendChild(overlay);
  document.querySelector(".overlay").classList.add("one");
  document.body.classList.add("modal-active");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
function init() {
  console.log(difficulty, numberOfCard);
  gameBrain.initGame();
  document.getElementById("timer").textContent = `${gameBrain.seconds} Seconds`;
  let shuffledArray = gameBrain.cards;
  for (let index = 0; index < shuffledArray.length; index++) {
    let cardContainer = document.createElement("div");
    let card = document.createElement("div");
    let frontFace = document.createElement("div");
    let backFace = document.createElement("div");
    ////////////////////////////////////////////////
    cardContainer.classList.add("card-container");
    card.classList.add("card");
    frontFace.className = "front";
    backFace.className = "back";
    backFace.textContent = shuffledArray[index].title;
    card.id = shuffledArray[index].id;
    //////////////////////////////////////////////////
    card.append(frontFace, backFace);
    cardContainer.appendChild(card);
    gameContainer.appendChild(cardContainer);
  }
  gameContainer.style.animation = "fly 0.9s ease-in-out forwards";
  infobar.style.animation = "land 0.9s ease-in-out forwards";
  restartButton.addEventListener("click", restartButtonPressed);
  gameContainer.classList.add("flip-all-cards", "no-clicking");
  setTimeout(() => {
    gameContainer.classList.remove("flip-all-cards", "no-clicking");
  }, 2000);

  let allCardContainers = Array.from(gameContainer.children);

  // cards callBacks on hover and click
  allCardContainers.forEach(function (cardContainer) {
    cardContainer.addEventListener("mouseover", function () {
      cardContainer.style.animation = "mouseover 0.1s 1 forwards";
    });

    cardContainer.addEventListener("mouseout", function () {
      cardContainer.style.animation = "mouseout 0.1s 1 forwards";
    });
    cardContainer.addEventListener("click", function () {
      cardPressed(cardContainer);
    });
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function cardPressed(selectedCard) {
  let card = selectedCard.querySelector(".card");
  card.classList.add("is-flipped");
  gameBrain.startTimer(timerCallBack, failCallback);
  let twoCardPressed = gameBrain.flipCard(Number(card.id));
  if (twoCardPressed) {
    stopClicking();
    updateMoves();
    let openedCards = gameBrain.openedCards;
    let matched = gameBrain.checkmatch(
      openedCards[0],
      openedCards[1],
      winnerCallBack
    );
    updateCardsUI(openedCards[0], openedCards[1], matched);
  }
}
function timerCallBack(seconds) {
  document.getElementById("timer").textContent =
    seconds === 1 ? `${seconds} Second` : `${seconds} Seconds`;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function stopClicking() {
  gameContainer.classList.add("no-clicking");
  setTimeout(() => {
    gameContainer.classList.remove("no-clicking");
  }, setTimeOutDuration);
}

function winnerCallBack() {
  let overlay = createScoreModal(true);
  document.body.appendChild(overlay);
  document.querySelector(".overlay").classList.add("one");
  document.body.classList.add("modal-active");
}

function failCallback() {
  let overlay = createScoreModal(false);
  document.body.appendChild(overlay);
  document.querySelector(".overlay").classList.add("one");
  document.body.classList.add("modal-active");
}

async function updateCardsUI(card1, card2, matched) {
  let card1UI = document.getElementById(card1.id);
  let card2UI = document.getElementById(card2.id);
  if (matched) {
    setTimeout(() => {
      addClassToCards(card1UI, card2UI, "matched");
      document.getElementById("sucess").play();
      addClassToCards(card1UI.parentElement, card2UI.parentNode, "no-clicking");
      addAnimationToCard(card1UI, card2UI, "pulse 0.5s 1 forwards");
      removeClassFromCards(card1UI, card2UI, "is-flipped");
    }, setTimeOutDuration);
  } else {
    setTimeout(() => {
      gameContainer.classList.remove("no-clicking");
      document.getElementById("fail").play();
      addAnimationToCard(card1UI, card2UI, "rubberBand 1s 1 forwards");
      removeClassFromCards(card1UI, card2UI, "is-flipped");
    }, setTimeOutDuration);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
// movesCount++;
// updateMoves();
function addClassToCards(card1, card2, added_class) {
  card1.classList.add(added_class);
  card2.classList.add(added_class);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeClassFromCards(card1, card2, removed_class) {
  card1.classList.remove(removed_class);
  card2.classList.remove(removed_class);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function addAnimationToCard(card1, card2, animation) {
  card1.parentElement.style.animation = animation;
  card2.parentElement.style.animation = animation;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function restartButtonPressed() {
  gameContainer.classList.add("flip-all-cards", "no-clicking");
  setTimeout(() => {
    removeAllChildNodes(gameContainer);
    gameBrain.resetGame();
    updateMoves();
    init();
    timerCallBack(gameBrain.seconds);
    Array.from(stars).forEach((star) => {
      star.className = "fa fa-star";
      console.log(star.className);
    });
  }, 320);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMoves() {
  let moves = gameBrain.moves;
  movesSpan.textContent = moves == 1 ? `${moves} Move` : `${moves} Moves`;
  switch (moves) {
    case 2:
      stars[2].className += "-o";
      break;
    case 10:
      stars[1].className += "-o";
      break;
    default:
      break;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createStartModal() {
  let overlay = document.createElement("div");
  let overlayBackground = document.createElement("div");
  let modal = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let input = document.createElement("input");
  let form = document.createElement("form");
  let button = document.createElement("button");
  let difficultySelection = document.createElement("div");
  let numbersSelection = document.createElement("div");
  difficultySelection.className = "difficulties-wrapper";
  numbersSelection.className = "numbers-wrapper";

  let difficulties = ["Easy", "Medium", "Hard"];
  let cardsNumbers = ["9", "12", "16"];
  p1.textContent = "Select Difficulty";
  p2.textContent = "Select no.of cards";
  // creating difficulties selection part
  for (let index = 0; index < difficulties.length; index++) {
    let item = document.createElement("div");
    if (index == 0) {
      item.className = "btn active";
    } else {
      item.className = "btn";
    }
    item.addEventListener("click", function () {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      difficulty = this.textContent;
    });

    item.textContent = difficulties[index];
    difficultySelection.appendChild(item);
  }

    // creating number of cards selection part
  for (let index = 0; index < cardsNumbers.length; index++) {
    let item = document.createElement("div");
    if (index == 0) {
      item.className = "btn1 active2";
    } else {
      item.className = "btn1";
    }
    item.addEventListener("click", function () {
      let current = document.getElementsByClassName("active2");
      current[0].className = current[0].className.replace(" active2", "");
      this.className += " active2";
      numberOfCard = this.textContent;
    });

    item.textContent = cardsNumbers[index];
    numbersSelection.appendChild(item);
  }

  // grouping all overlay elements
  overlay.className = "overlay";
  overlayBackground.className = "modal-background normal";
  modal.className = "modal";

  form.append(input, p1, difficultySelection, p2, numbersSelection, button);

  button.innerHTML = "Start";
  input.setAttribute("placeholder", "Please Enter Your Name");

  modal.append(form);
  overlayBackground.appendChild(modal);
  overlay.appendChild(overlayBackground);

  button.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".overlay").classList.add("out");
    setTimeout(() => {
      document.body.classList.remove("modal-active");
      document
        .querySelector(".overlay")
        .parentNode.removeChild(document.querySelector(".overlay"));
      init();
    }, 1200);
  });
  return overlay;
}

////////////////////////////////////////////////////////////////////////////////////////////////
function createScoreModal(winner) {
  let overlay = document.createElement("div");
  let overlayBackground = document.createElement("div");
  let modal = document.createElement("div");
  let button = document.createElement("button");
  let title = document.createElement("h2");


  if (winner) {
    title.innerHTML = "Well Done!";
    button.innerHTML = "Restart";
    overlayBackground.className = "modal-background sucess";
  } else {
    title.innerHTML = "Hard Luck!";
    button.innerHTML = "Restart";
    overlayBackground.className = "modal-background fail";
  }
  button.addEventListener("click", function (e) {
    e.preventDefault();
    overlay.classList.add("out");
    setTimeout(() => {
      document.body.classList.remove("modal-active");
      document.querySelector(".overlay").parentNode.removeChild(overlay);
    }, 1200);
  });

  overlay.className = "overlay";
  modal.className = "modal";

  modal.append(title, button);
  overlayBackground.appendChild(modal);
  overlay.appendChild(overlayBackground);

  return overlay;
}
////////////////////////////////////////////////////////////////////////////////////////////////