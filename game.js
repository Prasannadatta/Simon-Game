// declaration of variables
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

// to detect key press and start the game
$(document).keydown(() => {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

// for button press
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// to check user answer with computer generated answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 5000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(()=>{
    $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// to generate next computer sequence
function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(()=>{
    $("#" + randomChosenColour).fadeIn(250).fadeOut(250).fadeIn(250);
    playSound(randomChosenColour);
  },300);
  level++;
  $("#level-title").text("level " + level);
}

// function for playing sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function for blink animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

// to start over once game is over
function startOver() {
  level=0;
  started= false;
  gamePattern=[];
}
