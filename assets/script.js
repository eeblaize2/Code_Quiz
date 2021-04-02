var correct_span = document.querySelector(".correct");
var incorrect_span = document.querySelector(".incorrect");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var incorrect;
var correct;
var timer;
var qn;
var timerCount;

var question_array = [

    {
        question: "Where is the Great Barrier Reef located?",
        answers: ["Canada", "United States", "Austria", "Australia"],
        correct: 3
    },
    {
        question: "In Greek Mythology, who is the Queen of the Underworld and wife of Hades?",
        answers: ["Hera", "Aphrodite", "Persephone", "Artemis"],
        correct: 2
    },
    {
        question: "'Tome' refers to...",
        answers: ["A slow clock", "A large book", "Venomous Lizard", "JavaScript"],
        correct: 1
    },
    {
        question: "How many bones are in the human body?",
        answers: ["206", "195", "230", "110"],
        correct: 0
    },
    {
        question: "What group of animals is known as a 'flamboyance'?",
        answers: ["Owls", "Crows", "Flamingos", "Turkeys"],
        correct: 2
    }

]

// The startGame function is called when the start button is clicked
function startGame() {

    timerCount = 20;
    startTimer()
    qn = 0
    correct = 0;
    incorrect = 0;
    showQuestion(qn);  
    correct_span.innerHTML = correct;
    incorrect_span.innerHTML = incorrect;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;

}

function checkAnswer(n) {

    if (n == question_array[qn].correct) {
        // correct answer chosen
        // alert?
        // change the button to green
        document.getElementById("b" + n).style.backgroundColor = "green";
        correct++
    } else {
        // wrong answer chosen
        // alert?
        document.getElementById("b" + n).style.backgroundColor = "red";
        // deduct time from the timer
        timerCount--;
        incorrect++
    }

    correct_span.innerHTML = correct;
    incorrect_span.innerHTML = incorrect;

    qn++;
    if (qn === 5) {
        // Stops execution of action at set interval
        clearInterval(timer);
        // Calls function to create and append image
        gameOver();
    }
    else {
        showQuestion(qn); // Otherwise, show next question
    }
}

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        // Tests if time has run out
        if (timerCount <= 0) {
            // Clears timer
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function gameOver() {

    // Clear the questions area
    document.getElementById("questions").innerHTML = "<h1 style='text-align: center'>Game Over</h1>";

    // Let the person save initials to local-storage
    setTimeout(function() {
        var initials = prompt("Please Enter Your Initials");
        localStorage.setItem("correct", correct);
        localStorage.setItem("incorrect", incorrect);
        localStorage.setItem("initials", initials);
    },2000);

    // option to play again?

    startButton.disabled = false;

}


function showQuestion(q) {

    var html = "<h2>" + question_array[q].question + "</h2>";

    for (var i = 0; i < 4; i++) {

        // stuff to do...
        html += `<button id='b${i}' onclick='checkAnswer(${i})'>${question_array[q].answers[i]}</button><br>`

    }

    document.getElementById("questions").innerHTML = html;
}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);


