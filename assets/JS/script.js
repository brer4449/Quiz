const disableHS = document.getElementById("disable-hs");
const disableEnd = document.getElementById("disable-end");
const firstCard = document.getElementById("first-card");
const mainCard = document.getElementById("card1");
const mainBody = document.getElementById("card-text");
const emptyDiv = document.getElementById("empty-div");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("btn1");
const card2 = document.getElementById("card2");
const currentScore = document.getElementById("current-score");
const userName = document.getElementById("username");
const addBtn = document.getElementById("add");
const scoreList = document.getElementById("score-list");
const highScoresBtn = document.getElementById("high-scores");
const finishBtn = document.getElementById("done");
const endOfGame = document.getElementById("end-of-game-content");
const displayScore = document.getElementById("display-score");
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
  disableHS.classList.remove("disable-links");
  disableEnd.classList.remove("disable-links");
  setTime();
  displayQuestion();
}

//Resets the contents of the page
function setBlank() {
  mainCard.textContent = " ";
  mainBody.textContent = " ";
  startBtn.remove();
}

//Shows the next question, creates the answer buttons
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
  let clearMessage = function () {
    setInterval(function () {
      emptyDiv.textContent = "";
    }, 1500);
  };
  if (event.target.value === questions[index].answer) {
    score += 10;
    currentScore.textContent = `Current Score: ${score}`;
    emptyDiv.textContent = "Correct!";
    clearMessage();
  } else {
    score -= 5;
    currentScore.textContent = `Current Score: ${score}`;
    emptyDiv.textContent = "Incorrect!";
    clearMessage();
  }
  index++;
  displayQuestion();
}

addBtn.addEventListener("click", logScore);

function logScore() {
  let finalscore = score;
  let pTag = document.createElement("p");
  let name = `${userName.value}: ${finalscore}`;
  let userNameArray = JSON.parse(localStorage.getItem("username_array"));
  if (!userNameArray) {
    userNameArray = [];
  }
  userNameArray.push(name);
  localStorage.setItem("username_array", JSON.stringify(userNameArray));
  pTag.textContent = name;
  scoreList.appendChild(pTag);
}

highScoresBtn.addEventListener("click", showScores);

//Function that displays high score screen
function showScores() {
  clearInterval(timerInterval);
  firstCard.setAttribute("class", "hide");
  card2.setAttribute("class", "show text-center");
  let userNameArray = JSON.parse(localStorage.getItem("username_array"));
  if (!userNameArray) {
    userNameArray = [];
  }
  let sortedUserArray = [];
  // split LS array and reversed it to create new array of arrays
  for (let i = 0; i < userNameArray.length; i++) {
    let newEl = userNameArray[i].split(": ").reverse();
    sortedUserArray.push(newEl);
  }
  // Sorted the array by number and then in descending order
  sortedUserArray.sort().reverse();
  for (let i = 0; i < sortedUserArray.length; i++) {
    // Swapped position of each nested array ie. ["80", "BJE"] => ["BJE", "80"] and then joined them
    sortedUserArray[i].reverse().join();
  }
  for (let i = 0; i < sortedUserArray.length; i++) {
    let pTag = document.createElement("p");
    pTag.textContent = sortedUserArray[i].join(": ");
    scoreList.appendChild(pTag);
  }
  setBlank();
}

finishBtn.addEventListener("click", endContent);

//Function that reveals end of quiz content
function endContent() {
  setBlank();
  if (secondsLeft > 59) {
    score += 30;
  } else if (secondsLeft > 44) {
    score += 20;
  } else if (secondsLeft > 29) {
    score += 10;
  } else {
    score += 5;
  }
  clearInterval(timerInterval);
  endOfGame.setAttribute("class", "show");
  displayScore.textContent = `Your score: ${score}`;
}
