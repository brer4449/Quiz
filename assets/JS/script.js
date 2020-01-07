//Create div that will show highscore✓
    //Use local storage to keep scores in window local storage
//Create div that will show timer✓
    //Create timer function✓
//Create intro page✓
//Create function to start quiz✓
//Create function to display questions✓
//Create function to define questions as correct or not
//Create function to subtract 10 seconds for wrong answers
//Create function to add points

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
//Where scores are entered (input tag)
let scoreInput = document.getElementById("scoreinput");
//Add button for adding scores
let addBtn = document.getElementById("add");
//Empty p tag where scores are going to be stored
let scorelist = document.getElementById("scorelist")

addBtn.addEventListener("click", logScore);

function logScore(){
    
    scorelist.textContent = scoreInput.value;
    let pTag = document.createElement("p");
    pTag.innerHTML = "hello";
    scorelist.appendChild(pTag);


    // scorelist.appendChild(scoreInput.value);
}

console.log(scorelist);
// console.log(scoreInput);

//Score value that will increase as questions are answered
let score = 0;
//How much time is left
let secondsLeft = 75;
//Globally initializing this variable for the questions later on
// let wrong;
let index = 0;
//Variable declaring each question at position index
let currentQuestion = questions[index].title;
//Array with all the choices keys (answers)
let currentChoices = [questions[index].choices[0], questions[index].choices[1], questions[index].choices[2], questions[index].choices[3]]
//Variable declaring correct answer at position index
let currentAnswer = questions[index].answer;
// console.log(currentChoices[0]);

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

//Start button
start.addEventListener("click", startQuiz);

//function that gets the ball rolling
function startQuiz(){
    setTime();
    displayQuestion();
}

function setBlank(){
    mainCard.textContent=" ";
    mainBody.textContent=" ";
}

function displayQuestion(){
    setBlank();
    mainCard.textContent = currentQuestion;
    let newBtn1 = document.createElement("button");
    // newBtn1.setAttributes(newBtn1, {"class": "btn btn-primary btn-sm", "style": "margin-right: 5px"})
    // newBtn1.setAttribute("style", "margin-right: 5px");
    newBtn1.setAttribute("class", "btn btn-primary btn-sm");
    newBtn1.setAttribute("style", "margin-right: 5px");
    console.log(newBtn1);
    mainBody.appendChild(newBtn1);
    newBtn1.textContent = currentChoices[0];
    let newBtn2 = document.createElement("button");
    newBtn2.setAttribute("class", "btn btn-primary btn-sm");
    newBtn2.setAttribute("style", "margin-right: 5px");
    mainBody.appendChild(newBtn2);
    newBtn2.addEventListener("click", displayQuestion);
    newBtn2.textContent = currentChoices[1];
    let newBtn3 = document.createElement("button");
    newBtn3.setAttribute("class", "btn btn-primary btn-sm");
    newBtn3.setAttribute("style", "margin-right: 5px");
    mainBody.appendChild(newBtn3);
    newBtn3.addEventListener("click", displayQuestion);
    newBtn3.textContent = currentChoices[2];
    let newBtn4 = document.createElement("button");
    newBtn4.setAttribute("class", "btn btn-primary btn-sm");
    mainBody.appendChild(newBtn4);
    newBtn4.textContent = currentChoices[3];
    index++;
    start.remove();
    // if(currentChoices[0] === currentAnswer){

    // }
}


function wrongAnswer(){
    secondsLeft - 10
    displayQuestion();
};