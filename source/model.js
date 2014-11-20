function Card(options) {
  this.number = options.number;
  this.color = options.color;
  this.shape = options.shape;
  this.shading = options.shading;
}

function Game() {
  this.board = [];
  this.cardList = [];
  this.correctSets = 0;
  this.startingTime = Date.now();
  this.score = 0;
  this.deckMaker = function() {
    var numbers = [1, 2, 3];
    var shadings = ["empty", "fill", "hash"];
    var colors = ["orange", "purple", "teal"];
    var shapes = ["cloud", "flash", "arrow"];
    var cardList = [];
    for(i = 0; i < numbers.length; i++) {
      for(j = 0; j < shadings.length; j++) {
        for(k = 0; k < colors.length; k++) {
          for(l = 0; l < shapes.length; l++) {
            this.cardList.push(new Card({number: numbers[i], shading: shadings[j], color: colors[k], shape: shapes[l]}));
          }
        }
      }
    }
    return this.cardList;
  };
// sends an array of each of the 3 cards combined attribute to checkHand
  this.isSet = function(cards) {
    numbers = [];
    shadings = [];
    colors = [];
    shapes = [];
    for(var i = 0; i < cards.length; i++){
      numbers.push(cards[i].number);
      shadings.push(cards[i].shading);
      colors.push(cards[i].color);
      shapes.push(cards[i].shape);
    }
    return this.checkHand([numbers, shadings, colors, shapes]);
  };
// For each attribute, if the length of the unique'd attributes === 2 you don't have a set, return false.
// If you never return false, return true.
  this.checkHand = function(attributes) {
    var unique = this.toUnique(attributes)
    for(var i = 0; i < attributes.length; i++) {
      if(unique[i].length === 2)
        return false;
      }
    return true;
  };
  this.toUnique = function(attributes){
    for(var i = 0; i < attributes.length; i++) {
      attributes[i] = this.unique(attributes[i]);
    }
    return attributes;
  };
 //Returns an array of unique attributes. Should really be factored out.
  this.unique = function(array) {
    var output = [];
    for(var i = 0; i < array.length; i++){
      if (output.indexOf(array[i]) === -1) {
      	output.push(array[i]);
      }
    }
    return output;
  };
// Generates a random index within the length of the cardList
  this.sampleCard = function() {
  	var i = this.cardList.length - 1;
  	return j = Math.floor(Math.random() * (i + 1));
  };
  this.drawCard = function (number) {
    if (this.cardList.length === 0) {
    	this.endTheGame();
    	return false;
    }
    if (this.cardList.length < number) {
    	number = this.cardList.length - 1
    }
    for(var i = 0; i < number; i++) {
    	this.board.push(this.cardList.splice(this.sampleCard(), 1)[0])
    }
    if(this.checkBoard() === false) {
    	console.log("No possible sets");
    	this.drawCard(3);
    }
  };
  this.createBoard = function () {
    this.drawCard(12);
  };
  this.elapsedTime = function() {
	 return Date.now() - this.startingTime; 
  }
  this.endTheGame = function () {
    this.score = Math.floor((100000000000 * this.correctSets * 1.0) / (this.elapsedTime()))
    console.log(this.score);
    this.startingTime = -100;
    endGame()
  }
  // Returns true if there are possible combos, else false
  this.checkBoard = function() {
  	var combinations = k_combinations(this.board, 3)
  	for (var i = 0; i < combinations.length; i++) {
  		if(this.isSet(combinations[i])) {
  			// For cheating! :)
        console.log(combinations[i][0].number,
  				combinations[i][0].shading,
  				combinations[i][0].color,
  				combinations[i][0].shape,
  				combinations[i][1].number,
  				combinations[i][1].shading,
  				combinations[i][1].color,
  				combinations[i][1].shape,
  				combinations[i][2].number,
  				combinations[i][2].shading,
  				combinations[i][2].color,
  				combinations[i][2].shape
  				)
  			return true;
  		}
  	}
  	return false;
  };
  // CHEATING!
  this.hackBoard = function() {
  	var combinations = k_combinations(this.board, 3)
  	for (var i = 0; i < combinations.length; i++) {
  		if(this.isSet(combinations[i])) {
  			return combinations[i];
  		}
  	}
  	return false;
  };

  this.removeSet = function (cards) {
    for (var i = cards.length -1; i >=0 ; i--){
      index = this.board.indexOf(cards[i]);
      this.board.splice(index, 1);
    }
  };
// Must take an array of 3 cards!
  this.guess = function (cards) {
  	if (cards.length != 3) {
  		return "Not a valid guess length"
  	}
    if (this.isSet(cards)) {
      this.correctSets++
      this.removeSet(cards);
      if (this.board.length < 13) {
      	this.drawCard(3);
    	}
      return true
    }
    else {
      return false;
    }
  };

};

k_combinations = function(set, k) {
	var i, j, combs, head, tailcombs;	
	if (k > set.length || k <= 0) {
		return [];
	}
	if (k == set.length) {
		return [set];
	}
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}	
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i+1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}