var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function () {
    if (playing == true) {
        location.reload();
    } else {
        playing = true;
        score = 0;

        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameOver");
        document.getElementById("startreset").innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }
};

for (var i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    };
}

function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    var answers = [correctAnswer];

    for (var i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

// Function to update the time - to be called periodically
function updateTime() {
    // Get the current time
    const currentTime = new Date();

    // Get the hours, minutes, and seconds
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Format the time as a string
    const time = `${hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}`;

    // Add the time to the element with ID 'clock1'
    document.getElementById("clock1").innerHTML = time;
}

// Start updating time every second
setInterval(updateTime, 1000);

// Call updateTime once immediately to display the time upon page load
updateTime();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const gamerNameInput = document.getElementById("gamerName");
const startButton = document.getElementById("startButton");

gamerNameInput.addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const gamerName = gamerNameInput.value;
    document.querySelector(".container1 h1").innerHTML = `Hello, ${gamerName}!`;
    // Example: Start the game by navigating to 'game.html'
    window.location.href = "game.html"; // Replace 'game.html' with the filename of your game
  }
});

startButton.addEventListener("click", function() {
  const gamerName = gamerNameInput.value;
  document.querySelector(".container1 h1").innerHTML = `Hello, ${gamerName}!`;
  // Example: Start the game by navigating to 'game.html'
  window.location.href = "game.html"; // Replace 'game.html' with the filename of your game
});

// Get the gamer's name from the previous page
const gamerName = sessionStorage.getItem("gamerName");

// Display the gamer's name on the index page
document.querySelector(".container1 h1").innerHTML = `Hello, ${gamerName}!`;