const birthday = document.getElementById("birthday");
const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");

function calculateAge() {
   if (!birthday.value) return;

   const today = new Date();
   const todayYear = today.getFullYear();
   const todayMonth = today.getMonth() + 1;
   const todayDay = today.getDate();

   const b = birthday.value.split("-");
   const birthYear = parseInt(b[0]);
   const birthMonth = parseInt(b[1]);
   const birthDay = parseInt(b[2]);

   let ageYears = todayYear - birthYear;

   if (
      todayMonth < birthMonth ||
      (todayMonth === birthMonth && todayDay < birthDay)
   ) {
      ageYears--;
   }

   let ageMonths = todayMonth - birthMonth;
   if (ageMonths < 0) {
      ageMonths += 12;
   }

   let ageDays;
   if (todayDay >= birthDay) {
      ageDays = todayDay - birthDay;
   } else {
      const lastDayOfPreviousMonth = new Date(
         todayYear,
         todayMonth - 1,
         0
      ).getDate();
      ageDays = lastDayOfPreviousMonth - birthDay + todayDay;
      ageMonths--;
      if (ageMonths < 0) {
         ageMonths += 12;
         ageYears--;
      }
   }

   years.innerText = ageYears;
   months.innerText = ageMonths;
   days.innerText = ageDays;
}
