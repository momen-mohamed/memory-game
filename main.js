let gameContainer = document.querySelector(".main-game-container");

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
}

function mouseEvent(cardContainer, class1, class2) {
  cardContainer.classList.add(class1);
  cardContainer.classList.remove(class2);
}
