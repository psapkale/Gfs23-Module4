const joke = document.getElementById("joke");
const button = document.getElementById("button");

function getJoke() {
   joke.innerText = "Updating..";
   fetch("https://api.api-ninjas.com/v1/dadjokes", {
      method: "GET",
      headers: { "X-Api-Key": "1jsYxFMKRYrqW+EClhq/ww==hthehCmsku2Gsk1E" },
      contentType: "application/json",
   })
      .then((response) => {
         return response.json();
      })
      .then((result) => {
         joke.innerText = result[0]?.joke;
      })
      .catch((error) => {
         console.error("Error: ", error.message);
         joke.innerText = "An error happened, try again later";
      });
}

button.addEventListener("click", getJoke);
