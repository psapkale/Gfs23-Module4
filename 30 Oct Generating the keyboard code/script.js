const main = document.getElementById("main");
const startTag = document.getElementById("starting__tag");
const headingTag = document.getElementById("heading__tag");
const keyname = document.getElementById("keyname");
const keycode = document.getElementById("keycode");

window.addEventListener("keydown", (e) => {
   startTag.remove();
   headingTag.style.display = "block";
   keycode.style.display = "block";
   if (e.keyCode === 32) {
      keyname.innerText = "space";
   } else {
      keyname.innerText = e.key;
   }
   keycode.innerText = e.keyCode;
});
