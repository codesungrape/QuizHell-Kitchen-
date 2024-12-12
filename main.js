// create and stre varaible with element/DOm object that will render

const renderAPI = document.getElementById("APIrender");
const nextButton = document.getElementById("nextQuestion");
let num = 0;
const trueButton = document.getElementById("trueButton");
const falseButton = document.getElementById("falseButton");
let correctAnswer; 

// fucntion that goes the API logic

async function getQuestions() {
  try {
    //this URL gives easy boolean questions
    const quizAPI = await fetch(
      "https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy&encode=",{

    headers: {

        "Accept": "application/json"
    }
      }
    );
    function nextQuestion(){


    }
    //creates a function contains the data from the API such questions and answers 
    const quizAPIData = await quizAPI.json();
    console.log("all data", quizAPIData);

    // get the correct answer from the API and asaign to a variable
     correctAnswer = quizAPIData.results[num].correct_answer;

    // display one line of question
  
    let question = quizAPIData.results[num].question;
    console.log("question", question);
    //creates variable to decode the incomeing HTML
    const decodedQuestion = decodeHTML(question)
    //Sets the area the question will be show
    const questionElement = document.getElementById("Question")
    //shows the deocded question into a readable format
    questionElement.textContent = decodedQuestion
    //changeQuestion()
 
  } catch 
  {
    console.error("ERROR found");
  }
}
// decodes the HTML into inner HTML so that the text becomes readable and contain special symbals
function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
// Add event Lisnteer and test it
function changeQuestion(){
    num = num + 1
  console.log(num)

  getQuestions()
    
}

// function check weather the button is the correct answer by comparing it against quizAPIData
function compareBool(){
    let feedbackResponse = document.getElementById("feedbackResponse")

    if (correctAnswer === "True" || correctAnswer === "False"){
        console.log("well done")
        // update to inform player if they have chosen the correct answer to the question
        
        feedbackResponse.textContent = "well done"
    
    }
    else{
        console.log(`was false the correct answer is ${correctAnswer}` )
        // update to inform player if they have chosen the correct answer to the question
        feedbackResponse.textContent = `was false the correct answer is ${correctAnswer}`
    }
}

renderAPI.addEventListener("click", getQuestions);

nextButton.addEventListener("click", changeQuestion);
trueButton.addEventListener("click", compareBool)
falseButton.addEventListener("click", compareBool)




//cycle though each question number and add 1 to the question index each time the "next" button is clicked:done

//create 3 buttons , one for true , one for false and one for next question 

//assaign the correct answer to the correct button 
// correct button to result true object true and to false object false

// when out of question change question number to get results.

// write a function to actually diaply the question
// extra only the question from the returned ojbect
// get the element and save in vairable to be used
// create function that will display the question
// we jst need to display the question only
