// These functions help display the board and
// report certain board changes back to the controller

function View() {
}

View.prototype.updateGame = function(game) {
	this.clearBoard()
	this.displayGameInfo(game)
	this.displayCards(game.board);
}
//
View.prototype.displayGameInfo = function(game) {
	$('#cardsLeft').val(game.deck.length)
	$('#correctSets').val(game.correctSets)
}

View.prototype.showGame = function() {
	$('.outer-board').show()
	// $('.board').show()
	console.log('showGame	')
	$('.gameInfo').show()
	$('.landing').hide()
	$('.endGameScreen').hide()
	$('.highScores').hide()
}

View.prototype.showEndGame = function() {
	// $('.board').hide()
	$('.outer-board').hide()
	$('.gameInfo').hide()
	$('.endGameScreen').show()
	$('.highScores').show()
	$('.restart').show()
}

View.prototype.clearBoard = function() {
	$('.row1').empty()
	$('.row2').empty()
	$('.row3').empty()
}

View.prototype.flash = function(answer){
	var flash = '<div data-flash class="' + answer + 'Flash"></div>'
	$('html').append(flash).hide().fadeIn(10)
	$('.clicked_on').removeClass('clicked_on');
	$('[data-flash]').fadeOut(300)
}


// All these functions help add the right images to the board
View.prototype.numberAsWord = function(number) {
	if(number === 1) {
		return "one" }
	else if(number === 2) {
		return "two" }
	else if(number === 3) {
		return "three"
	}
}

View.prototype.makeImageHtml = function(shape, color, shade) {
	return shape + '_' + shade + '_' + color + '.png'
}

View.prototype.addToRow = function(row, card) {
	$('.row' + row.toString()).append(card);
}

View.prototype.makeCard = function(card, location) {
	var cardFace = "";
	for(var i = 0; i < card.number; i++) {
		cardFace += "<li class='image-container'><img src=' ../img/" + this.makeImageHtml(card.shape, card.color, card.shading) + "'></li>"
	}
	return "<ul data-location='" + location + "' class='card " + this.numberAsWord(card.number) + "'>" + cardFace + "</ul>";
}

View.prototype.displayCards = function(card_array) {
	var rowNum = 1;
	for(i = 0; i < card_array.length; i++) {
		if(i % 4 === 0 && i > 0){
			rowNum += 1;
		}
		if(i > 11) {
			rowNum = i - 11
		}
		this.addToRow(rowNum, this.makeCard(card_array[i], i))
	}
}
