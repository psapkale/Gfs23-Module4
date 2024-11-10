function adjacentDuplicates(str) {
   const charArray = str.split("");
   const res = [];
   charArray.forEach((c) => {
      if (res.length === 0) {
         res.push(c);
      } else if (res[res.length - 1] === c) {
         res.pop();
      } else {
         res.push(c);
      }
   });
   return res.join("");
}

function validAnagram(s, t) {
   const freq1 = Array(26).fill(0);
   const freq2 = Array(26).fill(0);
   const charArray1 = s.split("");
   const charArray2 = t.split("");
   charArray1.forEach((c) => {
      freq1[c.charCodeAt(0) - 97]++;
   });
   charArray2.forEach((c) => {
      freq2[c.charCodeAt(0) - 97]++;
   });
   for (let i = 0; i < 26; i++) {
      if (freq1[i] !== freq2[i]) {
         return false;
      }
   }
   return true;
}

function decodeString(s) {
   const countStack = [];
   const stringStack = [];
   let currentString = "";
   let currentNum = 0;

   for (let char of s) {
      if (/\d/.test(char)) {
         currentNum = currentNum * 10 + parseInt(char);
      } else if (char === "[") {
         countStack.push(currentNum);
         stringStack.push(currentString);
         currentNum = 0;
         currentString = "";
      } else if (char === "]") {
         let tempString = stringStack.pop();
         let repeatCount = countStack.pop();
         for (let i = 0; i < repeatCount; i++) {
            tempString += currentString;
         }
         currentString = tempString;
      } else {
         currentString += char;
      }
   }

   return currentString;
}

function reorganizeString(s) {
   const freqMap = new Map();
   for (let char of s) {
      freqMap.set(char, (freqMap.get(char) || 0) + 1);
   }

   const sortedChars = [...freqMap.entries()].sort((a, b) => b[1] - a[1]);

   const maxFreq = sortedChars[0][1];
   if (maxFreq > Math.floor((s.length + 1) / 2)) {
      return "";
   }

   const result = new Array(s.length);

   let index = 0;
   for (const [char, count] of sortedChars) {
      for (let i = 0; i < count; i++) {
         result[index] = char;
         index += 2;
         if (index >= s.length) {
            index = 1;
         }
      }
   }

   return result.join("");
}

console.log(reorganizeString("aab"));
console.log(reorganizeString("aaab"));
