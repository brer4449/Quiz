//References the whole card element (mainCard AND mainbody)
let firstcard = document.getElementById("firstcard");
//Title area element
let mainCard = document.getElementById("card1");
//p tag area element
let mainBody = document.getElementById("cardtext");
//Starover button
let startover = document.getElementById("startover");
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
let scorelist = document.getElementById("scorelist");
//End quiz button
let finishBtn = document.getElementById("done");
//Grabs end of game content
let endofgame = document.getElementById("endofgamecontent");
//Div that will display score to user when they click end game button
let displayscore = document.getElementById("displayscore")
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
//Attempt at setting final score
finalscore = 10
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
//Event listener that fires off when starover button is clicked
startover.addEventListener("click", startOver);
//Reloads the page when startover button is clicked
function startOver(){
};
//Resets the contents of the page
function setBlank(){
    mainCard.textContent=" ";
    mainBody.textContent=" ";
    emptyDiv.textContent=" ";
    //gets rid of start button
    start.remove();
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
        newBtn.setAttribute("style", "margin-right: 5px");
        newBtn.setAttribute("value", choice);
        newBtn.textContent = `${i + 1}. ${choice}`;
        newBtn.addEventListener("click", updateScore);
        mainBody.appendChild(newBtn);
    })
    //Creation of next button
    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "btn btn-primary");
    nextBtn.setAttribute("style", "display: inline-block");
    nextBtn.textContent = "Next";
    emptyDiv.appendChild(nextBtn);
    nextBtn.addEventListener("click", nextQuestion);
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
    //need to first set localstorage before getting from it
    //put setItem before .getItem
    //want to add score array to locally store the scores, and then will eventually display pTag.innerHTML = name + score
    let pTag = document.createElement("p");
    let name = userName.value;
    let userNameArray = JSON.parse(localStorage.getItem("username_array"));
    // let userScoreArray = JSON.parse(localStorage.getItem(""))
    userNameArray.push(name);
    localStorage.setItem("username_array", JSON.stringify(userNameArray));
    pTag.innerHTML = name;
    scorelist.appendChild(pTag);
}
//Event listener that links highscore button to displaying highscore screen
highscores.addEventListener("click", showScores)
//Function that displays highscore screen
function showScores(){
    firstcard.setAttribute("class", "hide");
    card2.setAttribute("class", "show text-center");
    let userNameArray = JSON.parse(localStorage.getItem("username_array"));
    for(let i=0; i<userNameArray.length; i++){
        let pTag = document.createElement("p");
        pTag.textContent = userNameArray[i];
        console.log(userNameArray);
        scorelist.appendChild(pTag);
    }
    setBlank();
}
//Function that keeps track of score
function updateScore(event){
    event.preventDefault();
    // emptyDiv.textContent="";
    if(event.target.value === questions[index].answer){
        score += 10;
        currentScore.textContent = `Score: ${score}`;
        let correct = document.createElement("p")
        correct.textContent = "Correct!";
        emptyDiv.appendChild(correct);
    } else {
        score -= 5;
        currentScore.textContent = `Score: ${score}`;
        let incorrect = document.createElement("p");
        incorrect.textContent= " ";
        incorrect.textContent = "Incorrect, try again!";
        emptyDiv.appendChild(incorrect);
    }
};
//Button that ends quiz
finishBtn.addEventListener("click", endContent)
//Function that reveals end of quiz content
function endContent(){
    setBlank();
    timer.remove();
    endofgame.setAttribute("class", "show")
    displayscore.textContent = `Your score: ${score}`;
}
