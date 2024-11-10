const parentContainer = document.getElementById("container");
const container = document.getElementById("main__wrapper");
const shape = document.getElementById("square");
const colorBtn = document.getElementById("change__color");
const shapeBtn = document.getElementById("change__shape");

function randomColor() {
   const rgb = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
   )}, ${Math.floor(Math.random() * 255)})`;
   return rgb;
}

function changeColor() {
   const color = randomColor();
   container.style.backgroundColor = color;
   parentContainer.style.borderColor = color;
   parentContainer.style.boxShadow = `0 20px 50px ${color}`;
   colorBtn.style.backgroundColor = color;
   shapeBtn.style.backgroundColor = color;
}

function changeShape() {
   const shapes = [
      "square",
      "round",
      "diamond",
      "triangle",
      "arrow",
      "frame",
      "star",
      "left-point",
      "right-point",
      "parallal",
      "cheg",
   ];

   const id = shapes[Math.floor(Math.random() * shapes.length - 1)];
   shape.id = id ? id : "square";
}

colorBtn.addEventListener("click", changeColor);
shapeBtn.addEventListener("click", changeShape);
