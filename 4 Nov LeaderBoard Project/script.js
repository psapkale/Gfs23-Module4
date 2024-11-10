const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const country = document.getElementById("country");
const score = document.getElementById("score");
const addScoreBtn = document.getElementById("button");
const scoreboard = document.getElementById("scoreboard");

let scores = [];

function renderLeaderboard() {
   if (scores.length === 0) {
      scoreboard.style.display = "none";
   } else {
      scoreboard.style.display = "block";
   }
   scoreboard.innerHTML = "";

   scores
      .sort((a, b) => b.score - a.score)
      .map((s) => {
         const div = document.createElement("div");
         const heading = document.createElement("div");
         const s__country = document.createElement("h2");
         const s__score = document.createElement("h2");
         const btnDiv = document.createElement("div");
         const deleteBtn = document.createElement("button");
         const minusBtn = document.createElement("button");
         const addBtn = document.createElement("button");

         div.classList.add("score");
         heading.classList.add("score__heading");
         const name = document.createElement("h2");
         name.innerText = s.firstName + " " + s.lastName;
         const date = document.createElement("h2");
         date.innerText =
            new Date().getDate() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getFullYear();
         heading.appendChild(name);
         heading.appendChild(date);
         s__country.innerText = s.country;
         s__score.innerText = s.score;
         btnDiv.classList.add("score__actions");
         deleteBtn.innerHTML = `
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="18"
               height="18"
               fill="currentColor"
               class="bi bi-trash"
               viewBox="0 0 16 16"
            >
               <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
               <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
            </svg>
         `;
         minusBtn.innerText = "-5";
         addBtn.innerText = "+5";
         btnDiv.appendChild(deleteBtn);
         btnDiv.appendChild(minusBtn);
         btnDiv.appendChild(addBtn);
         div.appendChild(heading);
         div.appendChild(s__country);
         div.appendChild(s__score);
         div.appendChild(btnDiv);

         deleteBtn.addEventListener("click", () => {
            scores = scores.filter(
               (sc) =>
                  sc.firstName !== s.firstName && sc.lastName !== s.lastName
            );
            renderLeaderboard();
         });
         minusBtn.addEventListener("click", () => {
            s.score -= 5;
            renderLeaderboard();
         });
         addBtn.addEventListener("click", () => {
            s.score = parseInt(s.score) + 5;
            renderLeaderboard();
         });

         scoreboard.appendChild(div);
      });
}

renderLeaderboard();

function addScore() {
   if (
      firstName.value === "" ||
      lastName.value === "" ||
      country.value === "" ||
      score.value === ""
   ) {
      alert("Please fill out all the fields");
      return;
   }
   scores.push({
      firstName: firstName.value,
      lastName: lastName.value,
      country: country.value,
      score: parseInt(score.value),
   });
   renderLeaderboard();
}

addScoreBtn.addEventListener("click", addScore);
