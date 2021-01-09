let gameContainer = document.querySelector(".main-game-container");
let movesSpan = document.getElementById("moves-made");
const stars = document.querySelectorAll("li i");
let started = false;
let seconds = 0;
let timeCount;
let movesCount = 0; // Number of moves made(clicks on card)
let setTimeOutDuration = 600;
//model
class Card {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

const ourCards = [
  new Card(1, "ninja"),
  new Card(1, "ninja"),
  new Card(2, "elephant"),
  new Card(2, "elephant"),
  new Card(3, "tiger"),
  new Card(3, "tiger"),
  new Card(4, "lion"),
  new Card(4, "lion"),
  new Card(5, "tom"),
  new Card(5, "tom"),
  new Card(6, "jerry"),
  new Card(6, "jerry"),
];

function initgame() {
  for (let index = 0; index < ourCards.length; index++) {
    let cardContainer = document.createElement("div");
    let card = document.createElement("div");
    let frontFace = document.createElement("div");
    let backFace = document.createElement("div");
    ////////////////////////////////////////////////
    cardContainer.classList.add("card-container");
    card.classList.add("card");
    frontFace.className = "front";
    backFace.className = "back";
    backFace.textContent = ourCards[index].title;
    card.id = ourCards[index].id;
    //////////////////////////////////////////////////
    card.appendChild(frontFace);
    card.appendChild(backFace);
    cardContainer.appendChild(card);
    gameContainer.appendChild(cardContainer);
    gameContainer.classList.add("flip-all-cards", "no-clicking");
    setTimeout(() => {
      gameContainer.classList.remove("flip-all-cards", "no-clicking");
    }, 2000);
  }
}

initgame();

let allCardContainers = Array.from(gameContainer.children);
console.log(allCardContainers);

allCardContainers.forEach(function (cardContainer) {
  cardContainer.addEventListener("mouseover", function () {
    // mouseEvent(cardContainer, "mouseover", "mouseout");
    cardContainer.style.animation = "mouseover 0.1s 1 forwards";
  });

  cardContainer.addEventListener("mouseout", function () {
    cardContainer.style.animation = "mouseout 0.1s 1 forwards";
  });
  cardContainer.addEventListener("click", function () {
    flipCard(cardContainer);
  });
});

function flipCard(selectedCard) {
  if (started === false) {
    startTimer();
  }
  selectedCard.querySelector(".card").classList.add("is-flipped");
  let flippedCards = Array.from(
    document.querySelectorAll(".card")
  ).filter((card) => card.classList.contains("is-flipped"));

  if (flippedCards.length == 2) {
    console.log("two card are flipped");
    stopClicking();
    checkmatch(flippedCards[0], flippedCards[1]);
  }
}

function stopClicking() {
  //   print(mainCardContainer);
  gameContainer.classList.add("no-clicking");

  setTimeout(() => {
    gameContainer.classList.remove("no-clicking");
  }, setTimeOutDuration);
}

function checkmatch(card1, card2) {
  if (card1.id === card2.id) {
    setTimeout(() => {
      card1.classList.add("matched");
      card2.classList.add("matched");
      card1.parentElement.style.animation = "pulse 0.5s 1 forwards";
      card2.parentElement.style.animation = "pulse 0.5s 1 forwards";
      card1.classList.remove("is-flipped");
      card2.classList.remove("is-flipped");
    }, setTimeOutDuration);
  } else {
    console.log("not matched");

    setTimeout(() => {
      gameContainer.classList.remove("no-clicking");
      card1.parentElement.style.animation = "rubberBand 1s 1 forwards";
      card2.parentElement.style.animation = "rubberBand 1s 1 forwards";
      card1.classList.remove("is-flipped");
      card2.classList.remove("is-flipped");
    }, setTimeOutDuration);
  }

  movesCount++;
  updatMoves();
}

// function mouseEvent(cardContainer, class1, class2) {
//   cardContainer.classList.add(class1);
//   cardContainer.classList.remove(class2);
// }

document.getElementById("restart").addEventListener("click", restartGame);
function restartGame() {
  movesCount = 0;
  seconds = 0;
  started = true;
  let matchedCards = Array.from(
    document.querySelectorAll(".card")
  ).filter((card) => card.classList.contains("matched"));

  let flippedCards = Array.from(
    document.querySelectorAll(".card")
  ).filter((card) => card.classList.contains("is-flipped"));

  matchedCards.forEach((card) => {
    card.classList.remove("matched");
  });

  flippedCards.forEach((card) => {
    card.classList.remove("is-flipped");
  });

  Array.from(stars).forEach((star) => {
    star.className = "fa fa-star";
    console.log(star.className);
  });
  resetTimer();
  updatMoves();
}

function updatMoves() {
  movesSpan.textContent =
    movesCount == 1 ? `${movesCount} Move` : `${movesCount} Moves`;
  switch (movesCount) {
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

function startTimer() {
  timeCount = setInterval(() => {
    seconds += 1;
    document.getElementById("timer").textContent =
      seconds === 1 ? `${seconds} Second` : `${seconds} Seconds`;
  }, 1000);
  started = true;
}

function resetTimer() {
  seconds = 0;
  started = false;
  document.getElementById("timer").textContent = `${seconds} Seconds`;
  clearInterval(timeCount);
}
