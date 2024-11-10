let n = 5;
for (let i = 0; i < n; i++) {
   let str = "";
   for (let j = 0; j < n - i - 1; j++) str += "  ";
   for (let j = 0; j < i + 1; j++) str += String(j + 1) + " ";
   console.log(str);
}
n = 4;
for (let i = 0; i < n; i++) {
   let str = "  ";
   for (let j = 0; j < i; j++) str += "  ";
   for (let j = 0; j < n - i; j++) str += String(j + 1) + " ";
   console.log(str);
}
