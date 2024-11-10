const ratingEles = document.querySelectorAll(".rating");

ratingEles.forEach((elem) => {
   elem.addEventListener("click", () => {
      elem.classList.toggle("active");
   });
});
