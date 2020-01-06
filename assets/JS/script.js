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
let highscores = document.getElementById("highscores");
let start = document.getElementById("btn1");
let scores = document.getElementById("scoreslist");

let secondsLeft = 75;
let wrong;
let i = 0;
let howmanytimes = 7;

//Variable declaring each question at position i
let currentQuestion = questions[i].title;
// console.log(questions)
//Array with all the choices keys (answers)
let currentAnswers = [questions[i].choices[0], questions[i].choices[1], questions[i].choices[2], questions[i].choices[3]]
// console.log(currentAnswers);

//Sets the timer (inside of the click event)
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

    //for loop attempting to delay each iteration of loop (and failing)
    // for(i; i<questions.length; i++){
    //     if(i < howmanytimes){
    //         setTimeout(startQuiz, 3000);
    //     }
    //     console.log(questions[i].title);
        
        // f();
        // createQuestion();
    // }
}

function nextQuestion(){
    start.removeEventListener("click", startQuiz);
    mainCard.textContent =" ";
    mainBody.textContent =" ";
    mainCard.textContent = currentQuestion;
    let newBtn1 = document.createElement("button");
    newBtn1.setAttribute("class", "btn btn-primary btn-sm");
    newBtn1.setAttribute("style", "margin-right: 5px");    
    mainBody.appendChild(newBtn1);
    console.log(newBtn1);
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
    start.textContent = "Next";
    i++;   
}

start.addEventListener("click", nextQuestion);

//test function to see if/how I can display questions, and potentially add a delay in the for loop
// function f() {
//     console.log("hi");
//     let question = document.createElement("h4");
//     // questionText = (question.textContent = questions[i]);
//     mainCard.appendChild(question);
//     i++;
//     if(i < howmanytimes){
//         setTimeout(f, 3000);
//     }
// }

// function createQuestion(){
//     let question = document.createElement("h4");
//     questionText = (question.textContent = questions[i].title);
//     mainCard.appendChild(question);
// }

function wrongAnswer(){
    if(wrong === true){
        secondsLeft - 10
    }
    nextQuestion();
};

function scoreboard(){

}

// Simple test to make sure we are connected
// console.log("loaded");
// function display() {
    // Simple test to make sure our function is being run
    // console.log("running display");
    // Let's see if we can access our questions array variable in the questions.js file
    // console.log(questions[0].title);
// }

// Don't forget we have to CALL our function
// display();

//set local storage item:
// localStorage.setItem("name", "John");
// localStorage.setItem("age", "42");
//remove from storage:
// localStorage.removeItem("name", "John");
//get from storage:
// const name = localStorage.getItem("name");
// const age = localStorage.getItem("age");
//clear local storage:
// localStorage.clear()
// console.log(name, age);

document.querySelector("form").addEventListener("submit", function(e){
    const task = document.getElementById("task").value
    console.log(task);
    //However, can't create more than one task this way:
    // localStorage.setItem("task", task);
    // alert("Task saved");
    //Can go around this issue by creating and array of tasks and store it as a string:
    let tasks;
    //Want to first pull anything already in local storage out of there (check to see if there's something in there already), and if so add it to this array, and if not create an empty one
    if(localStorage.getItem("tasks") === null){
        //Checking if there's anything in local storage, if not, create an empty array:
        tasks = [];
    } else {
        //If there IS something in there, going to set tasks array equal to what's in there:
        // tasks = localStorage.getItem("tasks");
        //The above is  going to be a string, so need to use JSONparse to turn it into an object we can use (not acutally an object, just an array with strings, but usually it's an array of JSON objects that's stored):
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    //Now push the task from the form (original task variable) onto the tasks array:
    tasks.push(task);
    //The above doesn't add it to local storage yet, still need to reset the localStorage task with the above new value
    //Can only store strings, so need to convert tasks array into a string using JSON.stringify:
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Task saved");
    e.preventDefault();
})
//Pull what's in local storage out of it:
// const tasks = localStorage.getItem("tasks");
//BUT we can't do forEach on the tasks array from local storage since it's stored as a string and forEach only works on arrays, so we have to parse what we take out
const tasks = JSON.parse(localStorage.getItem("tasks"));
tasks.forEach(function(task){
    console.log(task);
})