export default class Card {
    constructor(id,type, title) {
      this.id = id;
      this.type = type ;
      this.title = title;
      this.isFlipped = false;
      this.isMatched = false;
    }
  }