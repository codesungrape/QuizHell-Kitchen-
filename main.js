async function GetQuestions() {
  try {
    //this URL gives easy boolean questions
    const quizAPI = await fetch(
      "https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy"
    );

    const quizAPIData = await quizAPI.json();
    console.log("all data", quizAPIData);

    // display one line of question
    console.log("question", quizAPIData.results[5].question);

    // seperate multiple choice from boolians
    // seperate difficutlies
  } catch {
    console.error("ERROR found");
  }
}
GetQuestions();
