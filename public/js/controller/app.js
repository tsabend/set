$(document).ready(function(){
	getHighScores()
	flipIcons()
	showModal("rules")
	showModal("hof")

	$('.startGame').on( "click", function(){
		$(this).remove();
		view = new View
		game = new Game

		view.showGame()
		view.updateGame(game)
		displayTime()

		$('.card').click(cardClick)
		showModal("hint")
		$('.show-hint').click(function() {
			$('[data-hintText]').html(view.makeCard(game.hint(), "hint"))
		});
	});

});


	function getHighScores(){
		$.ajax({
			url: '/scores'
		}).done(function(res){
			var $list = $('[data-hof="scores"]')
			res.scores.forEach(function(score){
				var scoreHtml = '<li>' + score.username + ': ' + score.highscore + ' <img src="' + score.gif + '"></li>'
				$list.append(scoreHtml)
			})
		})
	}

	function showModal(attribute){
		$('.show-'+attribute).on("click", function(){
			$('[data-' + attribute + ']').slideDown(500)
			$('[data-esc]').on("click", function(){
				$('[data-' + attribute + ']').slideUp(500)
				$(this).off()
			})
			$(document).keyup(function(k){
				if(k.which == 27){
					$('[data-' + attribute + ']').slideUp(500)
					$(this).off()
				}
			})

		})
	}

	function flipIcons() {
		var shadings = ["empty", "fill", "hash"]
		var colors = ["orange", "purple", "teal"]
		var shapes = ["cloud", "flash", "arrow"]
		$('.flip').each(function(index){
			var src = "../img/"+ sample(shapes) +"_" + sample(shadings) + "_" + sample(colors) +".png"
			$($('.flip')[index]).attr("src", src).animate()
		})
		gt = setTimeout(function(){flipIcons()}, 1000);
	}


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
// Controls the end of the game view
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
