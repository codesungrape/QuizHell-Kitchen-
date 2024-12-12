// create and stre varaible with element/DOm object that will render

const renderAPI = document.getElementById("APIrender");

// fucntion that goes the API logic

async function GetQuestions() {
  try {
    //this URL gives easy boolean questions
    const quizAPI = await fetch(
      "https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy"
    );
    const quizAPIData = await quizAPI.json();
    console.log("all data", quizAPIData);

    // display one line of question
    let question = quizAPIData.results[5].question;
    console.log("question", question);
  } catch {
    console.error("ERROR found");
  }
}

// Add event Lisnteer and test it
renderAPI.addEventListener("click", GetQuestions());

// write a function to actually diaply the question
// extra only the question from the returned ojbect
// get the element and save in vairable to be used
// create function that will display the question
// we jst need to display the question only
