const firstcard = document.getElementById("firstcard");
const mainCard = document.getElementById("card1");
const mainBody = document.getElementById("cardtext");
const startoverBtn = document.getElementById("startover");
const emptyDiv = document.getElementById("emptydiv");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("btn1");
const highscoresBtn = document.getElementById("highscores");
const card2 = document.getElementById("card2");
const currentScore = document.getElementById("currentscore");
const userName = document.getElementById("username");
const addBtn = document.getElementById("add");
const scorelist = document.getElementById("scorelist");
const finishBtn = document.getElementById("done");
const endofgame = document.getElementById("endofgamecontent");
const displayscore = document.getElementById("displayscore");
let score = 0;
let secondsLeft = 75;
let index = 0;
let currentChoices = "";
//Variable declaring correct answer at position index
let currentAnswer = questions[index].answer;
let timerInterval;

//Sets the timer (inside of the start button click event)
function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = `Time: ${secondsLeft}`;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

//Displays GAME OVER image when time runs out, erases whatever is on the page
function sendMessage() {
  setBlank();
  let img = document.createElement("img");
  mainCard.appendChild(img);
  img.setAttribute("src", "assets/images/gameover.jpg");
}

//Start button event listener
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  setTime();
  displayQuestion();
}

//Resets the contents of the page
function setBlank() {
  mainCard.textContent = " ";
  mainBody.textContent = " ";
  emptyDiv.textContent = " ";
  startBtn.remove();
}

//Shows the next question, creates the answer buttons, removes start button
function displayQuestion() {
  setBlank();
  let currentQuestion = questions[index].title;
  mainCard.textContent = currentQuestion;
  currentChoices.textContent = " ";
  questions[index].choices.forEach(function (choice, i) {
    let newBtn = document.createElement("button");
    newBtn.setAttribute("class", "choice btn btn-primary btn-sm");
    newBtn.setAttribute("style", "margin-right: 5px");
    newBtn.setAttribute("value", choice);
    newBtn.textContent = `${i + 1}. ${choice}`;
    newBtn.addEventListener("click", nextQuestion);
    mainBody.appendChild(newBtn);
  });
}

//Function that increments index and calls the displayQuestion function to show us the next Q and updates score
function nextQuestion(event) {
  event.preventDefault();
  if (event.target.value === questions[index].answer) {
    score += 10;
    currentScore.textContent = `Score: ${score}`;
    // emptyDiv.textContent = "";
    emptyDiv.textContent = "Correct!";
  } else {
    score -= 5;
    currentScore.textContent = `Score: ${score}`;
    // emptyDiv.textContent = "";
    emptyDiv.textContent = "Incorrect!";
  }
  index++;
  displayQuestion();
}

addBtn.addEventListener("click", logScore);

function logScore() {
  let finalscore = currentScore.textContent;
  let pTag = document.createElement("p");
  let name = userName.value + finalscore;
  let userNameArray = JSON.parse(localStorage.getItem("username_array"));
  if (!userNameArray) {
    userNameArray = [];
  }
  userNameArray.push(name);
  localStorage.setItem("username_array", JSON.stringify(userNameArray));
  pTag.innerHTML = name;
  scorelist.appendChild(pTag);
}

highscoresBtn.addEventListener("click", showScores);
//Function that displays highscore screen
function showScores() {
  clearInterval(timerInterval);
  firstcard.setAttribute("class", "hide");
  card2.setAttribute("class", "show text-center");
  let userNameArray = JSON.parse(localStorage.getItem("username_array"));
  if (!userNameArray) {
    userNameArray = [];
  }
  for (let i = 0; i < userNameArray.length; i++) {
    let pTag = document.createElement("p");
    pTag.textContent = userNameArray[i];
    console.log(userNameArray);
    scorelist.appendChild(pTag);
  }
  setBlank();
}

//Button that ends quiz
finishBtn.addEventListener("click", endContent);
//Function that reveals end of quiz content
function endContent() {
  setBlank();
  clearInterval(timerInterval);
  endofgame.setAttribute("class", "show");
  displayscore.textContent = `Your score: ${score}`;
}
