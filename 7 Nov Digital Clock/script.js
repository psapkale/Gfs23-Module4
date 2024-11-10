const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const ampm = document.getElementById("ampm");
setInterval(() => {
   const date = new Date();
   seconds.innerText =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
   minutes.innerText =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
   let currHours = date.getHours();
   if (currHours > 12) {
      currHours = currHours - 12;
      ampm.innerText = "PM";
   } else {
      ampm.innerText = "AM";
   }
   hours.innerText = currHours < 10 ? "0" + currHours : currHours;
}, 1000);
