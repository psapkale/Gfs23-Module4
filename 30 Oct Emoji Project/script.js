const container = document.getElementById("container");
const search = document.getElementById("search");
const filters = document.getElementsByClassName("filters")[0];
const filterTags = ["All", "Face", "Heart", "Book", "Hand", "Sports", "Flag"];

filterTags.map((f) => {
   const button = document.createElement("button");
   button.innerText = f;
   button.classList.add("button");
   button.addEventListener("click", () => {
      if (f.toLowerCase() === "all") {
         renderEmojis("");
         return;
      }
      renderEmojis(f.toLowerCase());
   });
   filters.appendChild(button);
});

emojiList.map((emoji) => {
   const h1 = document.createElement("h1");
   h1.innerText = emoji.emoji;
   h1.classList.add("emoji");
   container.appendChild(h1);
});

function includeInTags(tags, searchQuery) {
   let inc = false;
   tags.forEach((tag) => {
      if (tag.includes(searchQuery)) {
         inc = true;
         return;
      }
   });
   return inc;
}

function handleInput(e) {
   renderEmojis(e.target.value);
}

function renderEmojis(searchQuery) {
   container.innerHTML = "";
   emojiList
      .filter(
         (emoji) =>
            emoji.description.includes(searchQuery) ||
            emoji.category.toLowerCase().includes(searchQuery) ||
            includeInTags(emoji.tags, searchQuery) ||
            includeInTags(emoji.aliases, searchQuery)
      )
      .map((emoji) => {
         const h1 = document.createElement("h1");
         h1.innerText = emoji.emoji;
         h1.classList.add("emoji");
         h1.addEventListener("click", () => {
            navigator.clipboard.writeText(emoji.emoji);
            alert(`Copied ${emoji.emoji}`);
         });
         container.appendChild(h1);
      });
}

search.addEventListener("input", handleInput);
