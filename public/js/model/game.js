function Game() {
  this.deck = this.makeDeck()
  this.board = []
  this.correctSets = 0
  this.startingTime = Date.now()
  this.score = 0
  this.createBoard()
}

Game.prototype.makeDeck = function() {
  var numbers = [1, 2, 3]
  var shadings = ["empty", "fill", "hash"]
  var colors = ["orange", "purple", "teal"]
  var shapes = ["cloud", "flash", "arrow"]
  var deck = []
  for(i = 0; i < numbers.length; i++) {
    for(j = 0; j < shadings.length; j++) {
      for(k = 0; k < colors.length; k++) {
        for(l = 0; l < shapes.length; l++) {
          deck.push(new Card({
            number: numbers[i],
            shading: shadings[j],
            color: colors[k],
            shape: shapes[l]}))
        }
      }
    }
  }
  return deck
}

Game.prototype.createBoard = function () {
  this.drawCard(12);
}
// Checks if the properties are all same or all different for each property. Returns true or false
Game.prototype.drawCard = function (number) {
  // end the game if there are no cards
  if(this.deck.length === 0 && this.checkBoard() === false) {
    return false
  }
  // remove random card from the deck and add to the board
  else if(this.deck.length > 0){
    for(var i = 0; i < number; i++) {
      this.board.push(sample(this.deck))
    }
  }
  // check the board to make sure there is at least 1 set, if not, draw 3 more cards
  if(this.checkBoard() === false) {
    console.log("No possible sets", this.correctSets)
    this.drawCard(3)
  }
}
Game.prototype.isSet = function(cards) {
// for each property, make an array of attributes across the 3 cards
  return Object.keys(cards[0]).map(function(property){
    return cards.map(function(card){
      return card[property]
    })
  }).every(function(attributes_array){ // return true if every array of attributes has a unique length not equal to 2
    return unique(attributes_array).length != 2
  })
}
// Returns true if there is at least 1 possible set, else false
Game.prototype.checkBoard = function() {
	var combinations = k_combinations(this.board, 3)
	for (var i = 0; i < combinations.length; i++) {
		if(this.isSet(combinations[i])) {
			return true
		}
	}
	return false
}
// checks if 3 cards are a valid set. adds points and draws if they are.
Game.prototype.guess = function (cards) {
  if(this.isSet(cards)) {
    this.correctSets++
    this.removeSet(cards)
    if(this.board.length <= 12) {
      this.drawCard(3)
    }
    return true
  } else {
  return false
  }
}

Game.prototype.isOver = function(){
  return this.deck.length === 0 && this.checkBoard() === false
}
// removes an array of cards from the board
Game.prototype.removeSet = function (cards) {
  for(var i = cards.length -1; i >=0 ; i--){
    index = this.board.indexOf(cards[i])
    this.board.splice(index, 1)
  }
}

// Helper methods on arrays
// Removes a random element from an array. Destructive.
sample = function(array) {
  return array.splice(Math.floor(Math.random() * (array.length)),1)[0];
};
//Returns an array of unique attributes.
unique = function(array) {
  return array.filter(function (a, b, c) {
      return c.indexOf(a, b + 1) < 0;
  })
}
// Returns all possible combinations of a set of items gor a given length k
k_combinations = function(set, k) {
	var i, j, combs, head, tailcombs
	if (k > set.length || k <= 0) {
		return []
	}
	if (k == set.length) {
		return [set]
	}
	if (k == 1) {
		combs = []
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]])
		}
		return combs
	}
	combs = []
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i+1)
		tailcombs = k_combinations(set.slice(i + 1), k - 1)
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]))
		}
	}
	return combs
}


// Easter Egg Methods
// For cheating! :)
Game.prototype.hackBoard = function() {
  var combinations = k_combinations(this.board, 3)
  for (var i = 0; i < combinations.length; i++) {
    if(this.isSet(combinations[i])) {
      return combinations[i];
    }
  }
  this.drawCard(3)
  return [this.board[0],this.board[1],this.board[2]]
};
// Hinting
Game.prototype.hint = function() {
  var combinations = k_combinations(this.board, 3)
  for (var i = 0; i < combinations.length; i++) {
    if(this.isSet(combinations[i])) {
      // return a the first card.
      return combinations[i][0]
      //   combinations[i][0].number,
      //   combinations[i][0].shading,
      //   combinations[i][0].color,
      //   combinations[i][0].shape,
      //   combinations[i][1].number,
      //   combinations[i][1].shading,
      //   combinations[i][1].color,
      //   combinations[i][1].shape,
      //   combinations[i][2].number,
      //   combinations[i][2].shading,
      //   combinations[i][2].color,
      //   combinations[i][2].shape
      // return true
    }
  }
  return false
}
