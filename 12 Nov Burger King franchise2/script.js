const burger = document.getElementById("burger");
const fries = document.getElementById("fries");
const drink = document.getElementById("drink");
const result = document.getElementById("result");
const orderId = document.getElementById("orderId");
const button = document.querySelector("button");

async function placeOrder(url, alt, delay) {
   const img = document.createElement("img");

   const p = new Promise((res) => {
      setTimeout(() => {
         res({ url, alt });
      }, delay);
   })
      .then((response) => {
         orderId.innerText = `Order ID: ${Math.max(
            Math.floor(Math.random() * 1000),
            Math.floor(Math.random() * 1000)
         )}`;
         img.src = response?.url;
         img.alt = response?.alt;
         button.disabled = false;
      })
      .catch(() => {
         console.error("Something went wrong");
      });

   await p;

   result.innerHTML = "";
   result.append(img);
}

function orderFood() {
   button.disabled = true;

   if (burger.checked) {
      placeOrder(
         "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
         "Burger",
         Math.floor(Math.max(Math.random() * 3000, Math.random() * 3000))
      );
   } else if (fries.checked) {
      placeOrder(
         "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
         "Fries",
         Math.floor(Math.max(Math.random() * 3000, Math.random() * 3000))
      );
   } else if (drink.checked) {
      placeOrder(
         "https://images.unsplash.com/photo-1437418747212-8d9709afab22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHJpbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
         "Drink",
         Math.floor(Math.max(Math.random() * 3000, Math.random() * 3000))
      );
   } else {
      button.disabled = false;
      return;
   }
}

button.addEventListener("click", orderFood);
