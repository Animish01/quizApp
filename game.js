const question = document.getElementById("ques");

// const choices = document.getElementsByClassName("option");
// The above list gives a node list, an html collection. In order to perform functions, we need to convert it to an array.

const choices = Array.from(document.getElementsByClassName("option"));
// console.log(typeof(document.getElementsByClassName("option")));
// Array.from() converts object into array.

let quesCountHTML = document.getElementById("progressText");
let scoreHTML = document.getElementById("score");
let progressBarFull = document.getElementById("progressBarFull");

const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAns = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let genre = localStorage.getItem("genre");
let difficulty = localStorage.getItem("difficulty");
console.log(genre);

if (genre === null) {

    genre = 9;
    difficulty = "easy";
}

let questions = [];

fetch(`https://opentdb.com/api.php?amount=10&category=${genre}&difficulty=${difficulty}&type=multiple`)

    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        // questions = loadedQuestions;
        // startGame();
        // console.log(loadedQuestions.results);


        questions = loadedQuestions.results.map(loadedQuestion => {

            // Each row of array loadedQueations is obtained as loadedQuestion.
            // Creating an object to be returned.

            formattedQuestion = {

                question: loadedQuestion.question
            }

            const answerChoices = [...loadedQuestion.incorrect_answers];
            // We put 3 options into our new array answerChoices.

            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            // This code to get a random number between 1 to 4, which will be our answer.


            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
            // This code to put correct answer in position 0 to 3 of our array answerChoices.

            answerChoices.forEach((choice, index) => {

                formattedQuestion["choice" + `${index + 1}`] = choice;
            })
            // This above step is to get our choice1, choice2... etc. of questions object made.

            // console.log(answerChoices);
            return formattedQuestion;
        })

        game.classList.remove("hidden");
        loader.classList.add("hidden");

        startGame();
    })
    .catch(err => {
        console.error(err);
    });


const correct_bonus = 10;
const max_q = 5;

startGame = () => {

    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // The spread operator makes sure the new array is the copy, not the original.
    // We could also have done     availableQuestions = questions; but this would mean that both arrays are pointing to same location and change to any one would effect the other.

    // console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= max_q) {

        // Before quitting the game, save the values.
        localStorage.setItem("SavedScore", score);


        // Go to the end page.
        return window.location.assign('/end.html');
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    let newQ = currentQuestion.question.replaceAll(`&quot;`, `"`);
    currentQuestion.question = newQ;

    newQ = currentQuestion.question.replaceAll(`&#039;`, `'`);
    currentQuestion.question = newQ;

    newQ = currentQuestion.question.replaceAll(`&rsquo;`, `'`);
    currentQuestion.question = newQ;

    ques.innerText = currentQuestion.question;

    quesCountHTML.innerText = `Question ${questionCounter}/${max_q}`;
    barLength = questionCounter / max_q * 100;
    progressBarFull.style.width = `${barLength}%`;

    choices.forEach(choice => {

        console.log(choice);
        const number = choice.dataset['number'];
        // dataset['number'] gives data-number from html.
        // console.log(number);

        console.log(currentQuestion);

        let question_option = currentQuestion['choice' + number];

        let opt = question_option.replaceAll(`&quot;`, `"`);
        question_option = opt;

        opt = question_option.replaceAll(`&#039;`, `'`);
        question_option = opt;

        opt = question_option.replaceAll(`&rsquo;`, `'`);
        question_option = opt;

        choice.innerText = question_option;
    })

    // The choices array that we made earlier, for each option, we get the number from HTML dataset (data-number), and then change the inner text.

    availableQuestions.splice(questionIndex, 1);
    // We need to remove the question of the index- questionIndex from availableQuestions array.


    acceptingAns = true;
}

choices.forEach(choice => {

    choice.addEventListener('click', e => {

        // console.log(e.target);

        // We usually do such console.log to check what stuff is going on.

        if (!acceptingAns) return;

        acceptingAns = false;
        // So that people don't click while this function is taking place.

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // if(selectedAnswer == currentQuestion.answer){
        //     console.log(true);
        // }
        // else{
        //     console.log(false);
        // }

        const classToAdd = (selectedAnswer == currentQuestion.answer) ? "correct" : "incorrect";

        if (classToAdd === "correct") {

            incrementScore(correct_bonus);
        }


        selectedChoice.classList.add(classToAdd);

        setTimeout(() => {

            selectedChoice.classList.remove(classToAdd);
            getNewQuestion();
        }, 400);

    })
})

incrementScore = (num) => {

    score += num;
    scoreHTML.innerText = score;
}


// console.log(choices)
// This outputs the options array.