﻿var questionList = Array;
var questionNum = 0;
var numAnswers;
var isLooks;
var personality = 0;
var looks = 0;

$(document).ready(function() {
    console.log("Document loaded.");

    $("button").click(function() {
        alert("button");
    });

    $.getJSON("assets/data/questions.json",
        function(data) {
            questionList = data.questions;
            console.log("Question list loaded:");
            console.log(questionList);
            loadQuestion(0);
        });
});

function logAnswer(answerId) {
    var answerText = document.getElementById("quizA" + answerId).innerHTML;

    $("<div></div>", {
        "class": "card border-primary",
        "id": "formerAnswer" + questionNum
    }).appendTo("#answeredCol");
    $("<div></div>", {
        "class": "card-header",
        "text": questionList[questionNum].prompt
    }).appendTo(("#formerAnswer" + questionNum));
    $("<div></div>", {
        "class": "card-body",
        "id": "formerAnswer" + questionNum + "body"
    }).appendTo(("#formerAnswer" + questionNum));
    $("<p></p>", {
        "class": "card-text",
        "text": answerText
    }).appendTo(("#formerAnswer" + questionNum + "body"));

    var score = answerId - (numAnswers / 2);
    console.log("Raw score:" + score + ".");
    if (isLooks) {
        looks += score;
        console.log("Looks value is now " + looks + ".");
    } else {
        personality += score;
        console.log("Personality value is now " + personality + ".");
    }
}

function loadQuestion(questionId) {
    if (questionList.length <= questionId) {
        return;
    }
    // Load the question
    var q = questionList[questionId];
    console.log("Question loaded into memory.");

    // Display prompt
    $("#quizAreaPrompt").prop('innerHTML', q.prompt);
    console.log("Prompt " + questionId + ", \"" + q.prompt + "\" displayed.");

    // Create a button for each answer
    $.each(q.answers, function(index, value) {
        $("<button>", {
            "class": "answer btn btn-outline-primary btn-lg btn-block",
            "text": value,
            "id": "quizA" + index
        }).appendTo("#quizAreaAnswers");
        numAnswers = index;
    });
    console.log("Answer list " + questionId + " displayed with " + (numAnswers + 1) + " answers.");

    // Retrieve looks or personality
    isLooks = q.looks;
    if (isLooks) {
        console.log("Question " + questionId + " is about looks.");
    } else {
        console.log("Question " + questionId + " is about personality.");
    }
}

//$("button.answer").click(function () {
//    console.log("Click detected.");
//    $(this).class = "answer btn btn-success btn-lg btn-block";
//    logAnswer($(this).id.substring(5));
//});

//var my_JSON_object = JSON.parse(request("../data/questions.json"));