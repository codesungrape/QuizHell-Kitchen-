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
let image = ["./faislel well done.png", "./faislel wrong.png" ]
let changeImage = document.getElementById("faisalImage")


async function getQuestions() {
  try {
    const quizAPI = await fetch("https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy&encode=",
      {
        headers: 
        {
          "Accept": "application/json",
        },
      }
    );

    quizAPIData = await quizAPI.json();
    hideStart();
    nextQuestion();
    return quizAPIData;
  } 
  catch {
    console.error("ERROR found");
  }
}

function hideStart(){
  renderAPI.style.opacity = 0;
  renderAPI.disabled = true;
}

function nextQuestion() {
  if (questionNumTracker === quizAPIData.results.length){
    endGame()
  }
  else{
  correctAnswer = quizAPIData.results[num].correct_answer;
  let question = quizAPIData.results[num].question;
  const decodedQuestion = decodeHTML(question);
  const questionElement = document.getElementById("Question");
  questionElement.textContent = decodedQuestion;
  feedbackResponse.textContent = "";
  questionNumTracker = num + 1
  }

}
function decodeHTML(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function changeQuestion() {
  num = num + 1;
  nextButton.disabled = true
  nextButton.style.opacity = 0
  nextQuestion();
}

function compareBool() {
  feedbackResponse = document.getElementById("feedbackResponse");
  if (correctAnswer === userInput) {
    feedbackResponse.textContent = "You get a point!!!";
    score++
    userScore.textContent = `Score = ${score} out of ${questionNumTracker}`
    changeImage.src = image[0]

  } else {
    feedbackResponse.textContent = `Sorry the correct answer is ${correctAnswer}`;
      userScore.textContent = `Score = ${score} out of ${questionNumTracker}`
      changeImage.src = image[1]
  }
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
