/*
 * Other Ideas:
 * Images of gordon responses that you can map through
 * **** created an array but unsure whether this should be implemnted- UNSURE PENDING
 * Timer - every question or whole game? - DONE
 *
 * STILL NEED TO DO:
 * Apply styling to TIMER
 *create a atTimerEnds function that stops the next question button,
 *
 * * works out the IQ value at the end and tells user if they are genius or not
 * */

//gordon images postive
const gordonPositiveImg1 = "images/postiveGordon/goldStarGordon.jpeg";
const gordonPostiveImg = [
  "images/postiveGordon/goldStarGordon.jpeg",
  "images/postiveGordon/you-did-it-Gordon.jpg",
];

//gordon images negative
const gordonNegativeImg1 = "images/negative Gordon/denseCabbageGordon.jpg";
const gordonNegativeImg = [
  "images/postiveGordon/goldStarGordon.jpeg",
  "images/postiveGordon/you-did-it-Gordon.jpg",
  "images/postiveGordon/youDonkey.png",
  "images/postiveGordon/fOffGetOut.png",
  "images/postiveGordon/makingMeMad.png",
  "images/postiveGordon/granGordon.jpeg",
];

const renderFromAPI = document.getElementById("APIrender");
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
let countdownStartValue = 20;
let countdown;

async function startGame() {
  try {
    const quizAPI = await fetch(
      "https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy"
    );

    quizAPIData = await quizAPI.json();
    userScore.textContent = `Score: ${score} out of 10`;
    hideStart();
    nextQuestion();
    startCountDown(countdownStartValue);
    return quizAPIData;
  } catch {
    console.error(e);
  }
}

function hideStart() {
  renderFromAPI.style.display = "none";
  headerInstructions.style.display = "none";
}

//create timer element in DOM
function createTimer() {
  //setup new timer DOM element
  const timer = document.createElement("h2");
  const timerDisplay = document.createElement("span");
  timer.appendChild(timerDisplay);

  const header = document.querySelector("header");
  header.appendChild(timer);

  return timerDisplay; // Return to be used later
}

function startCountDown(countdownStartValue) {
  //create the timer element
  const timerDisplay = createTimer();

  countdown = countdownStartValue;
  const intervalId = setInterval(() => {
    if (countdown > 0) {
      console.log(`Timer: ${countdown}`);
      timerDisplay.textContent = `Timer: ${countdown}`;
      countdown--;
    } else {
      console.log("Time's up you DONKEY!");
      timerDisplay.textContent = `Time's up you DONKEY!`;
      clearInterval(intervalId); // Stop the interval when countdown reaches 0
    }
  }, 1000);
}

function nextQuestion() {
  if (questionNumTracker === quizAPIData.results.length) {
    trueButton.disabled = false;
    endGame();
  } else {
    correctAnswer = quizAPIData.results[num].correct_answer;
    let question = quizAPIData.results[num].question;
    const decodedQuestion = decodeHTML(question);
    questionElement.textContent = decodedQuestion;
    questionNumTracker = num + 1;
    trueButton.disabled = false;
    falseButton.disabled = false;
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
  trueButton.disabled = true;
  falseButton.disabled = true;
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

renderFromAPI.addEventListener("click", startGame);
nextButton.addEventListener("click", changeQuestion);
trueButton.addEventListener("click", setTrue);
falseButton.addEventListener("click", setFalse);
