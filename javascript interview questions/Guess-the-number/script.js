const guess = document.getElementById("guess");
const submit = document.getElementById("submit");
const startGame = document.getElementById("startGame");
const status = document.getElementById("status");
const guesses = document.getElementById("guesses");

let g = [];
let ans = Math.floor(Math.random() * 100);

function handleSubmit() {
   const l = guess.value;
   if (l < ans) {
      status.innerText = "Too low";
   } else if (l > ans) {
      status.innerText = "Too high";
   } else {
      status.innerText = "You got it";
      submit.disabled = true;
      startGame.disabled = false;
   }
   g.push(l);
   guesses.innerText = `Your guesses: ${g.map((el) => `${el}, `)}`;
}

function handleReset() {
   guess.value = -1;
   submit.disabled = false;
   status.innerText = "";
   ans = Math.floor(Math.random() * 100);
   g = [];
   guesses.innerText = "Your guesses: ";
   startGame.disabled = true;
}

submit.addEventListener("click", handleSubmit);
startGame.addEventListener("click", handleReset);
