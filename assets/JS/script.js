//PROBLEMS:
//Now no buttons (for each to create them wasn't working)✓
//No button or function to go to next set of questions✓
//No local storage (going to work on it)
//No keeping track of score function

//Things for me to do:
//How to hide and show elements in JS
//
let mainCard = document.getElementById("card1");
let mainBody = document.getElementById("cardtext");
//Variable that references timer
let timer = document.getElementById("timer");
//Variable that references start button
let start = document.getElementById("btn1");
//Variable that references the highscores button
let highscores = document.getElementById("highscores");
//Variable that references the div that contains the scores
let card2 = document.getElementById("card2");
//Variable storing current score:
let currentScore = document.getElementById("currentscore");
//Where intials are entered (input tag)
let userName = document.getElementById("username");
//Add button for adding scores
let addBtn = document.getElementById("add");
//Empty p tag where scores are going to be stored
let scorelist = document.getElementById("scorelist")

//Add button event listener
addBtn.addEventListener("click", logScore);
//Function to connect add button with displaying it in p tag
function logScore(e){
    e.preventDefault();
    let pTag = document.createElement("p");
    // pTag.innerHTML = userName.value;
    // scorelist.appendChild(pTag);
    let scoreboard = [];
    scoreboard = userName.value;
    let convertedScoreboard = JSON.stringify(scoreboard);
    localStorage.setItem("scoreboard_array", convertedScoreboard);
    // JSON.parse(localStorage.getItem("scoreboard_array"));
    pTag.innerHTML = JSON.parse(localStorage.getItem("scoreboard_array"));
    scorelist.appendChild(pTag);
}
// readData();
// writeDaya();

//Score value that will increase as questions are answered
let score = 0;
//How much time is left
let secondsLeft = 75;
//Globally initializing this variable for the questions later on
let index = 0;
//Empty variable for later, going to have choices from question at position index in here
let currentChoices = "";
//Variable declaring correct answer at position index
let currentAnswer = questions[index].answer;

//Sets the timer (inside of the start button click event)
function setTime(){
    let timerInterval = setInterval(function(){
        secondsLeft--;
        timer.textContent= `Time: ${secondsLeft}`;
            if(secondsLeft === 0){
                clearInterval(timerInterval);
                sendMessage()
            }
    }, 1000)
}
//Displays GAME OVER image when time runs out, erases whatever is on the page
function sendMessage() {
    setBlank();
    let img = document.createElement("img");
    mainCard.appendChild(img);
    img.setAttribute("src", "assets/images/gameover.jpg");
}
//Start button event listener
start.addEventListener("click", startQuiz);
//function that gets the ball rolling
function startQuiz(){
    setTime();
    displayQuestion();
}
//Resets the contents of the page
function setBlank(){
    mainCard.textContent=" ";
    mainBody.textContent=" ";
}
//Function that (in theory) keeps track of score
function updateScore(e){
    e.preventDefault();
    if(e.target.value === questions[index].answer){
        score += 10;
        currentScore.textContent = `Score: ${score}`;
        alert("Correct!");
    } else {
        score -= 5;
        currentScore.textContent = `Score: ${score}`;
        alert("Incorrect, try again!");
        timer.textContent = secondsLeft - 10;
    }
};
//Shows the next question, creates the answer buttons, removes start button
function displayQuestion(){
    setBlank();
    //Variable declaring each question at position index
    let currentQuestion = questions[index].title;
    //Setting the title are to the current question
    mainCard.textContent = currentQuestion;
    currentChoices.textContent = " ";
    //forEach that creates each button from choices at position index
    questions[index].choices.forEach(function(choice, i){
        let newBtn = document.createElement("button");
        newBtn.setAttribute("class", "choice btn btn-primary btn-sm");
        newBtn.setAttribute("style", "margin-right: 5px")
        newBtn.setAttribute("value", choice);
        newBtn.textContent = `${i + 1}. ${choice}`;
        newBtn.addEventListener("click", updateScore);
        mainBody.appendChild(newBtn);
    })
    //gets rid of start button
    start.remove();
    //Creation of next button
    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "btn btn-primary")
    nextBtn.textContent = "Next";
    mainBody.appendChild(nextBtn);
    nextBtn.addEventListener("click", nextQuestion);
    updateScore();
};
//Function that increments index and calls the displayQuestion function to show us the next Q
function nextQuestion(){
    index++;
    displayQuestion();
}