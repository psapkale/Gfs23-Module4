const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const mseconds = document.getElementById("mseconds");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
let timer;
let stMilliseconds = 0;
let stSeconds = 0;
let stMinutes = 0;
let stHours = 0;

function startTimer() {
   startBtn.disabled = true;
   stopBtn.disabled = false;
   resetBtn.disabled = false;

   timer = setInterval(() => {
      stMilliseconds += 4;
      if (stMilliseconds >= 100) {
         stMilliseconds = 0;
         stSeconds++;
         if (stSeconds === 60) {
            stSeconds = 0;
            stMinutes++;
            if (stMinutes === 60) {
               stMinutes = 0;
               stHours++;
            }
         }
      }
      mseconds.innerText =
         stMilliseconds < 10 ? "0" + stMilliseconds : stMilliseconds;
      seconds.innerText = stSeconds < 10 ? "0" + stSeconds : stSeconds;
      minutes.innerText = stMinutes < 10 ? "0" + stMinutes : stMinutes;
      hours.innerText = stHours < 10 ? "0" + stHours : stHours;
   }, 1);
}

function stopTimer() {
   clearInterval(timer);
   stopBtn.disabled = true;
   startBtn.disabled = false;
   resetBtn.disabled = false;
}

function resetTimer() {
   clearInterval(timer);
   resetBtn.disabled = true;
   startBtn.disabled = false;
   stopBtn.disabled = false;
   stMilliseconds = 0;
   stSeconds = 0;
   stMinutes = 0;
   stHours = 0;
   mseconds.innerText = "00";
   seconds.innerText = "00";
   minutes.innerText = "00";
   hours.innerText = "00";
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
