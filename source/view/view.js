// These functions help display the board and
// report certain board changes back to the controller
function displayGameInfo(cardsLeft, correctSets) {
	$('#cardsLeft').val(cardsLeft)
	$('#correctSets').val(correctSets)
}

function getLocations(cards){
	var board_locations = []
	for(i = 0; i < cards.length; i++) {
		board_locations.push($('.clicked_on')[i].getAttribute('data-location'))
	}
	return board_locations
}

function getGuess(locations) {
	guess_array = []
	for(var coordinate in locations){
		guess_array.push(game.board[locations[coordinate]])
	}
	return guess_array
}

function clearBoard() {
	$('.row1').empty()
	$('.row2').empty()
	$('.row3').empty()
}

function rightFlash(){
	$('body').addClass('rightflash');
 	setTimeout( function(){
 	$('body').removeClass('rightflash');
 		}, 5000);
	$('.clicked_on').removeClass('clicked_on');
}

function wrongFlash(){
	$('body').addClass('wrongflash');
 	setTimeout( function(){
 	$('body').removeClass('wrongflash');
 		}, 5000);
	$('.clicked_on').removeClass('clicked_on');
}


// All these functions help add the right images to the board
function numberAsWord(number) {
	if(number === 1) {
		return "one" }
	else if(number === 2) {
		return "two" }
	else if(number === 3) {
		return "three"
	}
}

function makeImageHtml(number, shape, color, shade) {
	return shape + '_' + shade + '_' + color + '.png'
}

function addToRow(row, card) {
	$('.row' + row.toString()).append(card);
}

function makeCard(card, location) {
	var cardFace = "";
	for(var i = 0; i < card.number; i++) {
		cardFace += "<li class='image-container'><img src=' ../img/" + makeImageHtml(card.number, card.shape, card.color, card.shading) + "'></li>"
	}
	return "<ul data-location='" + location + "' class='card " + numberAsWord(card.number) + "'>" + cardFace + "</ul>";
}

function displayCards(card_array) {
	var rowNum = 1;
	for(i = 0; i < card_array.length; i++) {
		if(i % 4 === 0 && i > 0){
			rowNum += 1;
		}
		if(i > 11) {
			rowNum = i - 11
		}
		addToRow(rowNum, makeCard(card_array[i], i))
	}
}