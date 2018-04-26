var questionList;

function loadQuestion(questionId) {
    var q = questionList[questionId];
    console.log("Question list collected.");
    $("#quizAreaPrompt").prop('innerHTML', q.prompt);
    console.log("Prompt " + questionId + ", \"" + q.prompt + "\" displayed.");

    // Create a button for each answer
    $.each(q.answers, function (index, value) {
        $("<button>", {
            "class": "btn btn-outline-primary btn-lg btn-block",
            "text": value,
            "id": "quizA" + index
        }).appendTo("#quizAreaAnswers");
    });
    console.log("Question list " + questionId + " displayed.");
}

$.getJSON("assets/data/questions.json",
    function(data) {
        questionList = data.questions;
        console.log(questionList);
    });

$(document).ready(function () {
    console.log("Document loaded.");
    loadQuestion(0);
});

//var my_JSON_object = JSON.parse(request("../data/questions.json"));

