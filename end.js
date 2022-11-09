const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("SavedScore");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// console.log(highScores)

// Here, highScores is an array which will store scores on clicking the save button.

finalScore.innerText = localStorage.getItem("SavedScore");



username.addEventListener("keyup", () =>{

    saveScoreBtn.disabled = !username.value;
    // This function is used to enable the button. When some value is entered into the input field, the disabled is reversed, if the username field is not empty. If it becomes empty, the button is disabled again.

})


saveHighScore = (e) =>{

    console.log("User clicked");
    e.preventDefault();
    // Here preventDefault prevents the page from saving and reloading automatically.

    var score = {

        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);



    // highScores.sort((a,b) => {

    //     return b.score - a.score;
    // })
    // Same code below, but simpler.

    highScores.sort((a, b) => b.score - a.score );
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign('/quiz.html');

    // console.log(highScores);
}