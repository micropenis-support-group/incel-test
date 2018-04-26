var questionList;

$.getJSON("assets/data/questions.json",
    function(data) {
        console.log(data);
        questionList = data.questions;
    });

$(document).ready(function () {
    console.log("Document loaded.");
    loadQuestion(0);
});

//var my_JSON_object = JSON.parse(request("../data/questions.json"));

function loadQuestion(questionId) {
    var q = questionList[questionId];
    $("quizPrompt").html = q.prompt;

    // Create a button for each answer
    $.each(q.answers, function (index, value) {
        $("<button>", {
            "text": value,
            "id": "quizA" + index
        }).appendTo("#answers");
    });
}