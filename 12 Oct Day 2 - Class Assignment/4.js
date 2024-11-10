let n = 9;
for (let i = 0; i < n / 2; i++) {
   let str = "";
   for (let j = 0; j < i; j++) str += "  ";
   for (let j = 1; j <= n - 2 * i; j++) {
      str += String(j) + " ";
   }
   console.log(str);
}
