async function GetQuestions() {
    try { 
        //this URL gives easy boolean questions
        const quizAPI = await fetch("https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy", {
            headers: {
                "Accept": "application/json"
            }
        })
        
        
     // recovers all the data from the api relating to "type", "difficulty", "category", "question"
        const quizAPIData = await quizAPI.json()
        console.log("all data", quizAPIData)
    // display one line of question
    //object with an array with 10 object
    //console.log(`question,  ${quizAPIData[5]}`)
    console.log("question", quizAPIData.results[5].question)
    // seperate multiple choice from boolians
    // seperate difficutlies 
    }

    catch {

    }
}
GetQuestions()