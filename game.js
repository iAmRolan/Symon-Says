var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

// Event listen when any key is pressed and lunches game.
$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// User clicks button.
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  animatePress(this);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

// Indicates gray BG when user clicks button.
function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

//Test
//nextSequence();

// Play sound by user or nextSequence.
function playSound(e) {
  var audio = new Audio("sounds/" + e + ".mp3");
  audio.play();
}

// AutoPlay Sequence sound.
function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  // For AutoPlay chrome policy only!
  /*if (promise !== undefined) {
    promise
      .then((_) => {
        audio.play();
      })
      .catch((error) => {
        alert("In order to play this game, autoplay must be enabled!");
      });
  }*/
}

function checkAnswer(currentLevel) {
  // Check the last button clicked.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Set counter to count how many colors the user got right.
    var count = 0;
    // loop through the two array and compare EACH of the values.
    for (var i = 0; i < gamePattern.length; i++) {
      // Count + 1, if same values been found.
      if (gamePattern[i] === userClickedPattern[i]) {
        count++;
      }
    }
    // Only if the count eqauls to gamePattern length ,
    // Meaning each one of colors was the same.
    if (count === gamePattern.length) {
      console.log("success");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var wrongAudio = new Audio("sound/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over!\n Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
