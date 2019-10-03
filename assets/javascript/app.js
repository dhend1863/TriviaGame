$("#start").on("click", function () {
    $("#start").remove();
    game.loadQuestion();
})

$(document).on(`click`, `.answer-button`, function (e) {
    game.clicked(e);
})

$(document).on(`click`, `#reset`, function () {
    game.reset();
})

var questions = [{
    question: "What is #43 Darren Sproles' nickname?",
    answers: ["Little Sproles", "Tank", "Road Runner", "Nigerian Nightmare"],
    correctAnswer: "Tank",
    image: "assets/images/darren.jpg"
}, {
    question: "In K-State's Victory over Nebraska in 2002 who led K-State with 228 rushing yards?",
    answers: ["Ell Roberson", "Rock Cartwright", "Josh Scobey", "Darren Sproles"],
    correctAnswer: "Ell Roberson",
    image: "assets/images/ell.jpg"
}, {
    question: "Who did K-State open up the season against in the 2012 Big XII Title Season",
    answers: ["Kentucky State", "Missouri State", "South Dakota", "Eastern Kentucky"],
    correctAnswer: "Missouri State",
    image: "assets/images/ms.jpg"
}, {
    question: "What walk on changed positions mid season and helped lead K-State to a bowl game?",
    answers: ["Jordy Nelson", "Ryan Mueller", "Rock Cartwright", "Kody Cook"],
    correctAnswer: "Kody Cook",
    image: "assets/images/kody.jpg"
}, {
    question: "Who leads Kansas State in passing yards for a single season?",
    answers: ["Darrell Dickey", "Michael Bishop", "Josh Freeman", "Jake Waters"],
    correctAnswer: "Jake Waters",
    image: "assets/images/jw.jpg"
}, {
    question: "How many players has K-State put into the NFL all time?",
    answers: ["99", "127", "63", "147"],
    correctAnswer: "147",
    image: "assets/images/nfl.jpg"
}, {
    question: "What K-State wide receiver logged an interception in their career?",
    answers: ["Terrence Newman", "Kevin Lockett", "James Terry", "Jordy Nelson"],
    correctAnswer: "Kevin Lockett",
    image: "assets/images/klock.jpg"
}, {
    question: "Who is the only K-State QB to lead the Cats' to multiple bowl wins?",
    answers: ["Collin Klein", "Jake Waters", "Michael Bishop", "Johnathan Beasley"],
    correctAnswer: "Johnathan Beasley",
    image: "assets/images/jb.jpg"
}, {
    question: "Who recieved the most Heisman votes for the year they were up for the award?",
    answers: ["Ell Roberson", "Darren Sproles", "Collin Klein", "Michael Bishop"],
    correctAnswer: "Michael Bishop",
    image: "assets/images/mb.jpg"
}, {
    question: "Who did Bill Snyder beat to receive his first career victory as Head Coach?",
    answers: ["KU", "Alabama A&M", "Northern Iowa", "North Texas"],
    correctAnswer: "North Texas",
    image: "assets/images/unt.jpg"

}];

var game = {
    question: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        game.counter--;
        $(`#counter`).html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $(`#subwrapper`).html("<h2 id='counter'>30<h2>");
        $(`#subwrapper`).append(`<h2>` + questions[game.currentQuestion].
            question + `</h2>`);
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $(`#subwrapper`).append(`<button class="answer-button" 
            id="button-`+ i + `" data-name="` + questions[game.currentQuestion].answers[i] + `">` + questions[game.currentQuestion].answers[i] + `</button>`);
        }

    },
    nextQuestion: function () {
        game.counter = 30;
        $(`#counter`).html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $(`#subwrapper`).html(`<h2>DELAY OF GAME</h2>`);
        $(`#subwrapper`).append(`<h3>The Correct Answer Was:` + questions[game.
            currentQuestion].correctAnswer + `</h3>`)
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $(`#subwrapper`).html("<h2>AT THE END OF REGULATION</h2>");
        $(`#subwrapper`).append("<h3>Correct: " + game.correct + "</h3>");
        $(`#subwrapper`).append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $(`#subwrapper`).append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $(`#subwrapper`).append("<button id=`reset`>RESET</button>");





    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].
            correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();

        }
    },
    answeredCorrectly: function () {
        console.log("TOUCHDOWN!");
        clearInterval(timer);
        game.correct++;
        $(`#subwrapper`).html(`<h2>TOUCHDOWN!</h2>`);
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },
    answeredIncorrectly: function () {
        console.log("WIDE RIGHT NO GOOD!");
        clearInterval(timer);
        game.incorrect++;
        $(`#subwrapper`).html(`<h2>WIDE RIGHT NO GOOD!</h2>`);
        $(`#subwrapper`).append(`<h3>The Correct Answer Was:` + questions[game.
            currentQuestion].correctAnswer + `</h3>`)
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.counter = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    }


}