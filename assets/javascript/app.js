
var questions = [
	
	{
		question: "What is the most recent halo game?",
		answers: ["halo 3", "halo 4", "halo 5", "halo 6"],
		correctAnswer: "halo 5"

	},
	{
		question: "Who is the name of the protagonist of the halo series?",
		answers: ["Master Chief", "Cortana", "Arbiter", "Sergeant Johnson"],
		correctAnswer: "Master Chief"

	},
	{
		question: "What console is the halo series exclusive to?",
		answers: ["Playstation 4", "Nitendo Wii", "Sega", "Xbox One"],
		correctAnswer: "Xbox One"

	},
	{
		question: "When was the first halo released?",
		answers: ["Year 2001", "Year 2002", "Year 2003", "Year 2004"],
		correctAnswer: "Year 2001"

	},
	{
		question: "Who created the most recent halo?",
		answers: ["Bungie", "343 Industries", "Square Enix", "Sony"],
		correctAnswer: "343 Industries"

	},
	{
		question: "How much money has the halo franchise make since it's release?",
		answers: ["800 Million", "500 Million", "5 billion", "1 billion"],
		correctAnswer: "5 billion"

	},
	{
		question: "What was the prize for winning the halo 5 champion series?",
		answers: ["100 K", "300 K", "500 K", "1 Million"],
		correctAnswer: "1 Million"

	},
	{
		question: "Who is the greatest halo player of all time?",
		answers: ["Ogre 2", "Naded", "SnipeDown", "Darknight 1993"],
		correctAnswer: "Darknight 1993"

	},
	{
		question: "Who is the worst halo player of all time?",
		answers: ["Stelato", "Snoopy", "WeWe", "E for Element"],
		correctAnswer: "Stelato"

	},
	{
		question: "Who will be the halo 5 2017 champions?",
		answers: ["Optic Gaming", "Team Envy", "Liquid Gaming", "Dynamic 4"],
		correctAnswer: "Dynamic 4"

	},

];


$(document).on('click', '#start', function(event) {
  $('#container').prepend('<h2>Time Remaining: <span id="counter-number">20</span> Seconds</h2>');
  game.run();
});

$(document).on('click', '.answer-button', function(event) {
  game.clicked(event);
});



$(document).on('click', '#start-over', function(event) {
  game.reset();
});
var startTime = 20;
var correct = 0;

var game = {
	questions: questions,
	takenMap:{},
	taken:0,
	currentQuestion:0,
	counter: startTime,
	
	incorrect:0,
	countdown: function(){
		game.counter--;
		$('#counter-number').html(game.counter);
		if(game.counter===0){
			console.log("Time's up!");
			game.timeUp();
		}
	},
	run: function(){
		if(this.taken >= this.questions.length)
			return;

		timer = setInterval(game.countdown, 1000);

		var randomOrder = Math.floor(Math.random()*questions.length);

		while(this.takenMap[randomOrder])
      if(randomOrder+1 < questions.length)
        randomOrder++;
      else
        randomOrder = 0;

		this.takenMap[randomOrder] = true;
		this.taken++;
		this.currentQuestion = randomOrder;

    	$('#quiz').html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    	for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      	$('#quiz').append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    	}
	},
	nextQuestion: function(){
    game.counter = startTime;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.run();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    $('#quiz').html('<h2>Out of Time!</h2>');
    $('#quiz').append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    if (game.taken === questions.length){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    $('#quiz').html('<h2>Quiz Over!</h2>');
    $('#counter-number').html(game.counter);
    $('#quiz').append('<h3>Correct Answers: ' + correct + '</h3>');
    $('#quiz').append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    $('#quiz').append('<br><button id="start-over">Play Again?</button>');
    this.reset();
  },
  clicked: function(event) {
    clearInterval(timer);

    if ($(event.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    console.log(game.counter);
    clearInterval(timer);
    $('#quiz').html('<h2>Sorry!</h2>');
    $('#quiz').append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    if (game.taken === questions.length){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    correct++;
    $('#quiz').html('<h2>Correct!</h2>');
     $('#quiz').append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    if (game.taken === questions.length){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
	reset: function(){
    this.taken = 0;
    this.takenMap = {};
    	this.currentQuestion = 0;
    	this.counter = startTime;
    	this.correct = 0;
    	this.incorrect = 0;
    	this.run();
  	}
};
