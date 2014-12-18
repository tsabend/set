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
	displayGameInfo(game.deck.length, game.correctSets)
	displayTime()
	displayCards(game.board)
	$('.card').click(cardClick)
	$('.cheatbutton').click(function() {autoSolve(game)})
	$(this).off()
}
// Cheat function for demonstration purposes
function autoSolve(game) {
		while(game.isOver()===false) {
		game.guess(game.hackBoard());
	}
		clearBoard();
		displayGameInfo(game.deck.length, game.correctSets)
		displayCards(game.board);
		$('.card').click(cardClick);
		endGame()
}
// Makes cards talk between view-controller-model
function cardClick (){
	$(this).toggleClass('clicked_on');
	var clickedItems = $('.clicked_on');
	if (clickedItems.length === 3) {
		if(game.guess(getGuess(getLocations(clickedItems)))) {
			rightFlash();
			clearBoard();
			displayGameInfo(game.deck.length, game.correctSets)
			displayCards(game.board);
			$('.card').click(cardClick);
		}
		else {
			wrongFlash();
		}
	}
}

// Controls the end of the game view and loads the server (by calling init())
function endGame() {
	console.log("in endGame");
	$('.board').addClass('invisible');
	$('.gameInfo').addClass('invisible');
	$('.endGameScreen').removeClass('invisible');
	$('.highScores').removeClass('invisible');
	$('#score').val(game.score);
	stopTimer();
	$('.startGame').on();
}

// Show the game time
function displayTime() {
    time = Math.floor((Date.now() - game.startingTime)/1000)
    document.getElementById("time").value = time
    t = setTimeout(function(){displayTime()}, 1000);
}
function stopTimer() {
    clearTimeout(t);
}
