// reverse a string

function reverse(str) {
   const charArr = str.split("");
   let n = str.length;
   let i = 0;
   let j = n - 1;
   while (i <= j) {
      let ch = charArr[i];
      charArr[i] = charArr[j];
      charArr[j] = ch;
      i++;
      j--;
   }
   return charArr.join("");
}

// console.log(reverse("raman"));

function isPalindrome(str) {
   const chArr = str.split("");
   let n = str.length;
   let i = 0;
   let j = n - 1;
   while (i <= j) {
      if (chArr[i] != chArr[j]) {
         return false;
      }
      i++;
      j--;
   }
   return true;
}

// console.log(isPalindrome("racecar"));
