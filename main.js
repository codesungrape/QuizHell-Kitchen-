/*
 * Images of gordon responses that you can map through
 * works out the IQ value at the end and tells user if they are genius or not
 *
 * */

//gordon images postive
const gordonPositiveImg1 = "images/goldStarGordon.jpeg";
const gordonPositiveImg2 = "images/you-did-it-Gordon.jpg";
//gordon images negative
const gordonNegativeImg1 = "images/denseCabbageGordon.jpg";
const gordonNegativeImg2 = "images/granGordon.jpeg";

const renderFromAPI = document.getElementById("APIrender");
renderFromAPI;
const headerInstructions = document.getElementById("header-instructions");

const nextButton = document.getElementById("nextQuestion");
const trueButton = document.getElementById("trueButton");
const falseButton = document.getElementById("falseButton");
let userScore = document.getElementById("userScore");
let changeImage = document.getElementById("gordonImg");
let gordonImgContainer = document.getElementById("gordonImgContainer");
let image = [gordonPositiveImg1, gordonNegativeImg1];
let correctAnswer;
let quizAPIData;
let userInput;
let questionElement = document.getElementById("Question");
let score = 0;
let num = 0;
let questionNumTracker = 0;

async function getTenQuestions() {
  try {
    const quizAPI = await fetch(
      "https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy"
    );

    quizAPIData = await quizAPI.json();
    userScore.textContent = `Score: ${score} out of 10`;
    hideStart();
    nextQuestion();

    return quizAPIData;
  } catch {
    console.error("ERROR found");
  }
}

function hideStart() {
  renderFromAPI.style.display = "none";
  headerInstructions.style.display = "none";
}

function nextQuestion() {
  if (questionNumTracker === quizAPIData.results.length) {
    endGame();
  } else {
    correctAnswer = quizAPIData.results[num].correct_answer;
    let question = quizAPIData.results[num].question;
    const decodedQuestion = decodeHTML(question);
    questionElement.textContent = decodedQuestion;
    questionNumTracker = num + 1;
    hideGordon();
  }
}
function decodeHTML(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function changeQuestion() {
  num = num + 1;
  nextButton.disabled = true;
  nextButton.style.opacity = 0;
  changeImage.src = "";
  nextQuestion();
}

function compareBool() {
  if (correctAnswer === userInput) {
    score++;
    userScore.textContent = `Score: ${score} out of 10`;
    changeImage.src = image[0];
    showGordon();
  } else {
    userScore.textContent = `Score: ${score} out of 10`;
    changeImage.src = image[1];
    showGordon();
  }
  nextButton.disabled = false;
  nextButton.style.opacity = 1;
}

function hideGordon() {
  gordonImgContainer.style.display = "none";
}

function showGordon() {
  gordonImgContainer.style.display = "block";
}

function setTrue() {
  userInput = "True";
  compareBool();
}

function setFalse() {
  userInput = "False";
  compareBool();
}

function endGame() {
  let playerChoice = confirm(`congratulations you got ${score} correct`);
  if (playerChoice === true) {
    location.reload();
  }
}

renderFromAPI.addEventListener("click", getTenQuestions);
nextButton.addEventListener("click", changeQuestion);
trueButton.addEventListener("click", setTrue);
falseButton.addEventListener("click", setFalse);
