//Create div that will show highscore✓
    //Use local storage to keep scores in window local storage
//Create div that will show timer✓
    //Create timer function✓
//Create intro page✓
//Create function to start quiz✓
//Create function to run through questions
//Create function to subtract 10 seconds for wrong answers✓
//Create function to add points

let mainCard = document.getElementById("card1");
let mainBody = document.getElementById("cardtext");
let timer = document.getElementById("timer");
//Variable that references start button
let start = document.getElementById("btn1");
//Variable that references the highscores button
let highscores = document.getElementById("highscores");
//Variable that references the div that contains the scores
let card2 = document.getElementById("card2");
//How much time is left
let secondsLeft = 75;
//Globally initializing this variable for the questions later on
let wrong;
let i = 0;
let howmanytimes = 7;
//Variable declaring each question at position i
let currentQuestion = questions[i].title;
//Array with all the choices keys (answers)
let currentAnswers = [questions[i].choices[0], questions[i].choices[1], questions[i].choices[2], questions[i].choices[3]]

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
    mainCard.textContent=" ";
    let img = document.createElement("img");
    mainCard.appendChild(img)
    img.setAttribute("src", "assets/images/gameover.jpg");
}

//Start button
start.addEventListener("click", startQuiz);

//function that gets the ball rolling
function startQuiz(){
    setTime();
    nextQuestion();
}

function nextQuestion(){
    mainCard.textContent =" ";
    mainBody.textContent =" ";
    mainCard.textContent = currentQuestion;
    let newBtn1 = document.createElement("button");
    newBtn1.setAttribute("class", "btn btn-primary btn-sm");
    newBtn1.setAttribute("style", "margin-right: 5px");    
    mainBody.appendChild(newBtn1);
    newBtn1.textContent = currentAnswers[0];
    let newBtn2 = document.createElement("button");
    newBtn2.setAttribute("class", "btn btn-primary btn-sm");
    newBtn2.setAttribute("style", "margin-right: 5px");
    mainBody.appendChild(newBtn2);
    newBtn2.textContent = currentAnswers[1];
    let newBtn3 = document.createElement("button");
    newBtn3.setAttribute("class", "btn btn-primary btn-sm");
    newBtn3.setAttribute("style", "margin-right: 5px");
    mainBody.appendChild(newBtn3);
    newBtn3.textContent = currentAnswers[2];
    let newBtn4 = document.createElement("button");
    newBtn4.setAttribute("class", "btn btn-primary btn-sm");
    mainBody.appendChild(newBtn4);
    newBtn4.textContent = currentAnswers[3];
    i++;
    start.remove();
}

function wrongAnswer(){
    if(wrong === true){
        secondsLeft - 10
    }
    nextQuestion();
};