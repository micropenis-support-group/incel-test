var questionList;
var numAnswers;
var isLooks;

function logAnswer(answerId) {
    
}

function loadQuestion(questionId) {
    // Load the question
    var q = questionList[questionId];
    console.log("Question loaded into memory.");

    // Display prompt
    $("#quizAreaPrompt").prop('innerHTML', q.prompt);
    console.log("Prompt " + questionId + ", \"" + q.prompt + "\" displayed.");

    // Create a button for each answer
    $.each(q.answers, function (index, value) {
        $("<button>", {
            "class": "answer btn btn-outline-primary btn-lg btn-block",
            "text": value,
            "id": "quizA" + index
        }).appendTo("#quizAreaAnswers");
        numAnswers = index;
    });
    console.log("Question list " + questionId + " displayed.");

    // Retrieve looks or personality
    isLooks = q.looks;
    if (isLooks) {
        console.log("Question " + questionId + " is about looks.");
    } else {
        console.log("Question " + questionId + " is about personality.");
    }
}

$("button.answer").click(function () {
    console.log("Click detected.");
    $(this).class = "answer btn btn-success btn-lg btn-block";
    logAnswer($(this).id.substring(5));
});

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

