// create and stre varaible with element/DOm object that will render

const renderAPI = document.getElementById("APIrender");
const nextButton = document.getElementById("nextQuestion");
let num = 0;
const trueButton = document.getElementById("trueButton");
const falseButton = document.getElementById("falseButton");
let correctAnswer;
let quizAPIData;
let userInput;
let feedbackResponse;
let score = 0;
let userScore = document.getElementById("userScore")
let questionNumTracker = 1; 
// fucntion that goes the API logic

async function getQuestions() {
  try {
    //this URL gives easy boolean questions
    const quizAPI = await fetch(
      "https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy&encode=",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    //creates a function contains the data from the API such questions and answers
    quizAPIData = await quizAPI.json();
    console.log("all data", quizAPIData);
    // add the next question function , so that question can be assigned
    hideStart();
    nextQuestion();
  
    return quizAPIData;
  } catch {
    console.error("ERROR found");
  }

}

// create function that will hide the CLICK ME/START button when pressed 
function hideStart(){
  renderAPI.style.opacity = 0;
  renderAPI.disabled = true;

}
function nextQuestion() {
  if (questionNumTracker === quizAPIData.results.length){
    endGame()
  }
  else{
  // get the correct answer from the API and asaign to a variable
  correctAnswer = quizAPIData.results[num].correct_answer;
  console.log(correctAnswer);

  // display one line of question
  let question = quizAPIData.results[num].question;
  console.log("question", question);
  //creates variable to decode the incomeing HTML
  const decodedQuestion = decodeHTML(question);
  //Sets the area the question will be show
  const questionElement = document.getElementById("Question");
  //shows the deocded question into a readable format
  questionElement.textContent = decodedQuestion;

  feedbackResponse.textContent = "";
  questionNumTracker = num + 1
console.log("question numb", questionNumTracker)
  }
}

// decodes the HTML into inner HTML so that the text becomes readable and contain special symbals
function decodeHTML(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function changeQuestion() {
  num = num + 9;
  console.log(num);
  // create variable that will track the question that the player is on remebering to +1 as the index starts from 0

// when next button has been clicke hide again until answer has been chosen
  nextButton.disabled = true
  nextButton.style.opacity = 0
  nextQuestion();
}

// function check weather the button is the correct answer by comparing it against quizAPIData
function compareBool() {
  feedbackResponse = document.getElementById("feedbackResponse");

  if (correctAnswer === userInput) {
    console.log("well done");
    // update to inform player if they have chosen the correct answer to the question
    feedbackResponse.textContent = "well done";
    score++
    // updates the score on the HTML
    userScore.textContent = `Score = ${score} out of ${questionNumTracker}`

    console.log(score)
  } else {
    console.log(`was false the correct answer is ${correctAnswer}`);
    // update to inform player if they have chosen the correct answer to the question
    feedbackResponse.textContent = `Sorry the correct answer is ${correctAnswer}`;
      userScore.textContent = `Score = ${score} out of ${questionNumTracker}`
  }

  // once true or false has been clicked set the opacity of the next question button to visable and make it clickable
  nextButton.disabled = false
  nextButton.style.opacity = 1 

}

function setTrue() {
  userInput = "True";
  compareBool();
}

function setFalse() {
  userInput = "False";
  compareBool();
}
// create and endgame function that will compare the render API result length to how many questions have passed and if they reach the show the end screen
function endGame(){
  let playerChoice = confirm(`congratulations you got ${score} correct`)
  if (playerChoice === true){
    location.reload();
  }
}

renderAPI.addEventListener("click", getQuestions);
nextButton.addEventListener("click", changeQuestion);
trueButton.addEventListener("click", setTrue);
falseButton.addEventListener("click", setFalse);



// saves the score weather the play gets the answer correct or not and displays score to player
//creat a variable to save the score and add to the compare bool function so if they player gets a question right they will get a point 
// tracks the question numbers and displays it to the player