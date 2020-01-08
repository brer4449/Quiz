//PROBLEMS:
//Now no buttons (for each to create them wasn't working)✓
//No button or function to go to next set of questions✓
//No local storage (going to work on it)
//No keeping track of score function

//Title area element
let mainCard = document.getElementById("card1");
//p tag area element
let mainBody = document.getElementById("cardtext");
//Empty div area for next button
let emptyDiv = document.getElementById("emptydiv");
//Empty div that will indicate if answer is right or wrong
let rightwrong = document.getElementById("rightwrong");
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
    emptyDiv.textContent=" ";
    //gets rid of start button
    start.remove();
}
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
    //Creation of next button
    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "btn btn-primary")
    nextBtn.setAttribute("style", "display: inline-block")
    nextBtn.textContent = "Next";
    emptyDiv.appendChild(nextBtn);
    nextBtn.addEventListener("click", nextQuestion);
    updateScore();
};
//Function that increments index and calls the displayQuestion function to show us the next Q
function nextQuestion(){
    index++;
    displayQuestion();
}
//Add button event listener
addBtn.addEventListener("click", logScore);
//Function to connect add button with displaying it in p tag
function logScore(){
    let pTag = document.createElement("p");
    // pTag.innerHTML = userName.value;
    // scorelist.appendChild(pTag);
    let scoreboard = " ";
    scoreboard += userName.value;
    let convertedScoreboard = JSON.stringify(scoreboard);
    localStorage.setItem("scoreboard_array", convertedScoreboard);
    // JSON.parse(localStorage.getItem("scoreboard_array"));
    pTag.innerHTML = JSON.parse(localStorage.getItem("scoreboard_array"));
    scorelist.appendChild(pTag);
}
// readData();
// writeDaya();
//Function that displays highscore screen
//Event listener that links highscore button to displaying highscore screen
highscores.addEventListener("click", showScores)
//Function that reveals hidden scoreboard block of code
function showScores(){
    firstcard.setAttribute("class", "hide");
    card2.setAttribute("class", "show text-center");
    setBlank();
}
//Function that keeps track of score
function updateScore(event){
    
    if(event.target.value === questions[index].answer){
        score += 10;
        currentScore.textContent = `Score: ${score}`;
        let correct = document.createElement("p")
        correct.textContent = "Correct!";
        emptyDiv.appendChild(correct);
    } else {
        score -= 5;
        currentScore.textContent = `Score: ${score}`;
        let incorrect = document.createElement("p")
        incorrect.textContent = "Incorrect, try again!";
        emptyDiv.appendChild(incorrect);
        timer.textContent = secondsLeft - 10;
    }
};