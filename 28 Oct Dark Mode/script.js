const body = document.body;
const blob = document.getElementById("blob");
const heading = document.getElementById("heading");
let theme = "light";

function toggle() {
   if (theme === "light") {
      theme = "dark";
      blob.style.left = "56%";
      body.style.backgroundColor = "black";
      heading.style.color = "white";
   } else {
      theme = "light";
      blob.style.left = "5%";
      body.style.backgroundColor = "white";
      heading.style.color = "black";
   }
}
