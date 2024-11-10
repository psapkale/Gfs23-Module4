let n = 5;
for (let i = 0; i < n; i++) {
   let str = "";
   for (let j = i + 1; j > 0; j--) {
      str += String(j) + " ";
   }
   console.log(str);
}
n--;
for (let i = 0; i < n; i++) {
   let str = "";
   for (let j = n - i; j > 0; j--) {
      str += String(j) + " ";
   }
   console.log(str);
}
