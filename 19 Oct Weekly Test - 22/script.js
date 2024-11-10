const input = document.querySelector(".date-input");
const res = document.querySelector("#ans");

function calculateAge() {
   const date = input.value.split("-");
   const year = date[0];
   const month = date[1];
   const day = date[2];
   const today = new Date();
   const todayYear = today.getFullYear();
   const todayMonth = today.getMonth() + 1;
   const todayDay = today.getDate();

   let age = todayYear - year;
   const m = todayMonth - month;
   if (m < 0 || (m === 0 && day < todayDay)) {
      age--;
   }
   res.innerText = age;
}
