function reverse(str) {
   let charArray = str.split("");
   let i = 0;
   let j = str.length - 1;
   while (i < j) {
      let t = charArray[i];
      charArray[i] = charArray[j];
      charArray[j] = t;
      i++;
      j--;
   }
   return charArray.join("");
}

const isAnagram = (str1, str2) => {
   if (str1.length !== str2.length) return false;

   const charCount = {};

   for (let char of str1.toLowerCase().replace(/[^a-z]/g, "")) {
      charCount[char] = (charCount[char] || 0) + 1;
   }

   for (let char of str2.toLowerCase().replace(/[^a-z]/g, "")) {
      if (!charCount[char]) return false;
      charCount[char]--;
   }

   return true;
};

const arrayIntersection = (arr1, arr2) => {
   const same = [];
   arr1.forEach((elem) => {
      if (arr2.includes(elem) && !same.includes(elem)) {
         same.push(elem);
      }
   });
   return same;
};

function palindrome(str) {
   let i = 0,
      j = str.length - 1;
   const charArray = str.split("");
   while (i < j) {
      while (/[^a-zA-Z0-9]/.test(charArray[i])) {
         i++;
      }
      while (/[^a-zA-Z0-9]/.test(charArray[j])) {
         j--;
      }
      if (charArray[i] !== charArray[j]) {
         return false;
      }
      i++;
      j--;
   }
   return true;
}

function reverse(arr, start, end) {
   while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
   }
}

function rotateArrayReversal(arr, k) {
   const n = arr.length;
   k = k % n;

   reverse(arr, 0, k - 1);
   reverse(arr, k, n - 1);
   reverse(arr, 0, n - 1);

   return arr;
}

function compressString(str) {
   let compressed = "";
   let count = 1;

   for (let i = 1; i < str.length; i++) {
      if (str[i] === str[i - 1]) {
         count++;
      } else {
         compressed += str[i - 1] + count;
         count = 1;
      }
   }

   compressed += str[str.length - 1] + count;

   return compressed.length < str.length ? compressed : str;
}

function findPairWithSum(arr, target) {
   const numMap = new Map();

   for (let i = 0; i < arr.length; i++) {
      const complement = target - arr[i];

      if (numMap.has(complement)) {
         return [numMap.get(complement), i];
      }

      numMap.set(arr[i], i);
   }

   return [];
}

function lengthOfLongestSubstring(s) {
   let charSet = new Set();
   let longest = 0;
   let left = 0;

   for (let right = 0; right < s.length; right++) {
      while (charSet.has(s[right])) {
         charSet.delete(s[left]);
         left++;
      }

      charSet.add(s[right]);
      longest = Math.max(longest, right - left + 1);
   }

   return longest;
}

console.log(lengthOfLongestSubstring("abcabcbb"));
