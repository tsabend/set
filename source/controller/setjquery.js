$(document).ready(function(){
		// for(var i = 0; i < 100; i++){
		// clearBoard();
		// runGame();
		// autoSolve(game);
		// }
	$('.startGame').on( "click", function(){
		$(this).remove();
		view = new View
		game = new Game

		view.showGame
		view.updateGame(game)
		displayTime()
		$('.hint').show()
		$('.card').click(cardClick)
		$('.hint').click(function() {alert(game.hint())})
		$('.cheatbutton').click(function() {autoSolve(game)})
	});
});



// Cheat function for demonstration purposes
function autoSolve(game) {
		while(game.isOver()===false) {
		game.guess(game.hackBoard());
	}
		view.updateGame(game)
		$('.card').click(cardClick);
		endGame()
}
// Makes cards talk between view-controller-model
function cardClick (){
	$(this).toggleClass('clicked_on');

	if ($('.clicked_on').length === 3) {
		var cards = $('.clicked_on').get().map(function(item){
			return game.board[item.getAttribute('data-location')]
		})

		if(game.guess(cards)) {
			view.updateGame(game)
			$('.card').click(cardClick);
			view.flash("right");
		} else {
			view.flash("wrong");
		}
	}
}
// Controls the end of the game view and loads the server (by calling init())
function endGame() {
	console.log("in endGame");
	view.showEndGame()
	$('#score').val(game.score);
	stopTimer();
	$('.startGame').on();
}
// Show the game time
function displayTime() {
    time = Math.floor((Date.now() - game.startingTime)/1000)
    $("#time").val(time)
    t = setTimeout(function(){displayTime()}, 1000);
}
function stopTimer() {
    clearTimeout(t);
}
