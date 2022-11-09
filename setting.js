const genre = document.getElementById("cat");
const difficulty = document.getElementById("diff");

// console.log(genre.value);

// const save = document.getElementById("save");

console.log(genre.value);
localStorage.setItem("genre", genre.value);
localStorage.setItem("difficulty", difficulty.value);


let save = () => {

    console.log(difficulty.value);
    localStorage.setItem("genre", genre.value);
    localStorage.setItem("difficulty", difficulty.value);

    // setTimeout(() => {

    window.location.replace("/index.html")
    // }, 2000);
}