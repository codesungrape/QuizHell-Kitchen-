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
    // add the enxt question function , so that question can be assigned
    nextQuestion();
    return quizAPIData;
  } catch {
    console.error("ERROR found");
  }
}

function nextQuestion() {
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
}

// decodes the HTML into inner HTML so that the text becomes readable and contain special symbals
function decodeHTML(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function changeQuestion() {
  num = num + 1;
  console.log(num);

  nextQuestion();
}

// function check weather the button is the correct answer by comparing it against quizAPIData
function compareBool() {
  feedbackResponse = document.getElementById("feedbackResponse");

  if (correctAnswer === userInput) {
    console.log("well done");
    // update to inform player if they have chosen the correct answer to the question
    feedbackResponse.textContent = "well done";
  } else {
    console.log(`was false the correct answer is ${correctAnswer}`);
    // update to inform player if they have chosen the correct answer to the question
    feedbackResponse.textContent = `Sorry the correct answer is ${correctAnswer}`;
  }
}

function setTrue() {
  userInput = "True";
  compareBool();
}

function setFalse() {
  userInput = "False";
  compareBool();
}

renderAPI.addEventListener("click", getQuestions);
nextButton.addEventListener("click", changeQuestion);
trueButton.addEventListener("click", setTrue);
falseButton.addEventListener("click", setFalse);
