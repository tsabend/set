$(document).ready(function(){	
	$('.startGame').on( "click", function(){
		$('.board').removeClass('invisible');
		$('.gameInfo').removeClass('invisible');
		$('.endGameScreen').addClass('invisible');
		$('.highScores').addClass('invisible');
		clearBoard();
		runGame();
	});
});

// Main controller
function runGame() {
	game = new Game
	game.deckMaker()
	game.createBoard()
	displayGameInfo(game.cardList.length, game.correctSets)
	startCount();
	displayCards(game.board)
	$('.card').click(cardFeatures);
	$('.cheatbutton').click(function() {autoSolve(game)})
	$(this).off();
}
// Cheat function for demonstration purposes
function autoSolve(game) {
		while(game.cardList.length > 0) {
		game.guess(game.hackBoard());
		console.log(game.cardList.length)
	}
		clearBoard();
		displayGameInfo(game.cardList.length, game.correctSets)
		displayCards(game.board);
		$('.card').click(cardFeatures);
}
// Makes cards talk between view-controller-model
function cardFeatures (){
	$(this).toggleClass('clicked_on');
	var clikedItems = $('.clicked_on');
	if (clikedItems.length === 3) {
		if(game.guess(getGuess(getLocations(clikedItems)))) {
			rightFlash();
			clearBoard();
			displayGameInfo(game.cardList.length, game.correctSets)
			displayCards(game.board);
			$('.card').click(cardFeatures);
		}
		else {
			wrongFlash();
		}
	}
}
// Controls the end of the game view and loads the server (by calling init())
function endGame() {
	console.log("Got it");
	$('.board').addClass('invisible');
	$('.gameInfo').addClass('invisible');
	$('.endGameScreen').removeClass('invisible');
	$('.highScores').removeClass('invisible');
	$('#score').val(game.score);
	stopCount();
	init();
	$('.startGame').on();
}



