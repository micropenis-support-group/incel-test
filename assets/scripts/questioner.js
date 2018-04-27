var questionList = Array;
var questionNum = 0;
var numAnswers;
var isLooks;
var personality = 0;
var personalityCount = 0;
var looks = 0;
var looksCount = 0;

$(document).ready(function() {
    console.log("Document loaded.");

    $("#quizAreaAnswers").on('click', 'button', function(event) {
        var ansNum = Number(event.target.id.substring(5));
        logAnswer(ansNum);
    });

    $.getJSON("assets/data/questions.json",
        function(data) {
            questionList = data.questions;
            console.log("Question list loaded:");
            console.log(questionList);
            loadQuestion(0);
            $("#progressbar").attr('aria-valuemax', questionList.length);
        });
});

function logAnswer(answerId) {
    var answerText = document.getElementById("quizA" + answerId).innerHTML;
    $("#progressbar").attr('aria-valuenow', questionNum + 1);
    $("#progressbar").attr('style', 'width: ' + (100 * (questionNum + 1) / questionList.length) + '%');

    $("<div></div>", {
        "class": "card border-primary",
        "id": "formerAnswer" + questionNum
    }).prependTo("#answeredCol");
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

    var score = calcScore(answerId, numAnswers);
    console.log("Raw score:" + score + ".");
    if (isLooks) {
        looks += score;
        console.log("Looks value is now " + looks + ".");
    } else {
        personality += score;
        console.log("Personality value is now " + personality + ".");
    }

    loadQuestion(questionNum + 1);
}

function loadQuestion(questionId) {
    if (questionList.length <= questionId) {
        finale();
        return;
    }

    questionNum = questionId;

    $("#quizAreaAnswers").empty();
    console.log("Answers cleared");

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
        looksCount++;
    } else {
        console.log("Question " + questionId + " is about personality.");
        personalityCount++;
    }
}

function calcScore(answer, options) {
    n = options / 2;
    if ((options % 2) != 0) {
        console.log("Odd number of answers.")
        if (answer < ((options + 1) / 2)) {
            return calcScore(answer, options + 1);
        } else {
            return calcScore(answer + 1, options + 1);
        }
    }
    console.log("Even number of answers.")
    return ((answer - n) / n);
}

function finale() {
    $("#quizAreaAnswers").empty();
    console.log("Answers cleared");
    $("#quizAreaPrompt").prop('innerHTML', "Your score");

    // Scale scores
    var personalityFinal = -1 * personality * (253 / personalityCount)
    console.log("Final personality: " + personalityFinal);
    var looksFinal = looks * (253 / looksCount)
    console.log("Final looks: " + looksFinal);

    moveDot((personalityFinal), (looksFinal));
    $("#chart").prop('hidden', '');

    if (personalityFinal == 0 && looksFinal == 0) {
        $("#congrats-message").addClass('alert-secondary');
        $("#congrats-message").prop('innerHTML',
            "<strong>Radical Center.</strong> You are Jared Fogle. <br/>" +
            "<img src=\"https://qz.com/wp-content/uploads/2015/07/jared-fogle.jpg\" title=\"Jared Fogle thumbs-up\" style=\"width: 100%; display: block;\" />");
    } else if (personalityFinal <= 0 && looksFinal >= 0) {
        $("#congrats-message").addClass('alert-danger');
        $("#congrats-message").prop('innerHTML',
            "<strong>You are Beta Beta.</strong> " +
            "You look like a beta male and have the personality of one too. " +
            "You are truly the lowest of society. " +
            "You look like a slightly overfilled sandwich bag full of cottage cheese with an anime t-shirt. " +
            "You probably have never had a girlfriend, and if you did she likely broke up with you years ago and " +
            "you haven’t gotten over it. " +
            "You haven’t had human contact in months, and at this point the only chance you have now " +
            "is to retreat back to your mother’s basement and hope that God grants you a second chance at life.");
    } else if (personalityFinal < 0 && looksFinal <= 0) {
        $("#congrats-message").addClass('alert-warning');
        $("#congrats-message").prop('innerHTML',
            "<strong>You are Beta Chad.</strong> " +
            "You look like a chad but have the personality of a beta male. " +
            "You are likely a Beta Beta who decided to try to improve himself and start hitting the gym. " +
            "You now have a body that is sculpted from marble, but I just want to let you know that it won’t help. " +
            "No matter what clothes you buy, what you can bench, it will never change what a repugnant human being you are. " +
            "No amount of skincare products you use will ever wash away all the anime episodes you have watched. " +
            "Your massive muscles are nothing more than a cover for your corroded soul. " +
            "If you ever get a girlfriend, you have to constantly be on your guard so that you don’t accidently slip " +
            "that you know the entire script to Naruto by heart and she realized the monster you truly are.");
    } else if (personalityFinal >= 0 && looksFinal > 0) {
        $("#congrats-message").addClass('alert-info');
        $("#congrats-message").prop('innerHTML',
            "<strong>You are Chad Beta.</strong> " +
            "You have the personality of a chad but the looks of a beta male. " +
            "Don’t worry, even though you look like a fat piece of shit your chad personality will carry you through life. " +
            "You probably are part of a frat, and can talk to chicks at parties. " +
            "Your chad-ness will still carry you through life, so enjoy graduating with an econ/poly sci major and getting a desk job, " +
            "and marrying an ex-sorority girl at age 30, and having two kids named Brad and Stacey.");
    } else if (personalityFinal > 0 && looksFinal < 0) {
        $("#congrats-message").addClass('alert-success');
        $("#congrats-message").prop('innerHTML',
            "<strong>You are Chad Chad.</strong> " +
            "You look and act like Mr. Steal Your Girl. " +
            "You naturally smell like old spice, and no matter what happens you always manage to find a clean vineyard vines shirt" +
            "in your closet. You sweat juul pods, and your urine is bottled and sold as craft beer. " +
            "Your future entails: You enjoy working as an I-banker at Goldman Sachs. You married your formal date. " +
            "You lived in an upper middle class suburban house. Your son just got named captain of the football team, " +
            "and he named you his role model at his acceptance speech. Your life is on easy mode. " +
            "Just please, when your living your perfect life, just remember the beta betas of the world, living in their mom’s basement, " +
            "covered in Cheeto dust and trying to understand how to function like a human. " +
            "Please remember the most destitute of humans and try to be grateful for the fact that God has handed you a golden, " +
            "6 pack and prefect blonde hair shaped ticket.");
    }
    $("#congrats-message").prop('hidden', '');
}

//$("button.answer").click(function () {
//    console.log("Click detected.");
//    $(this).class = "answer btn btn-success btn-lg btn-block";
//    logAnswer($(this).id.substring(5));
//});

//var my_JSON_object = JSON.parse(request("../data/questions.json"));