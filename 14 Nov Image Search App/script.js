const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const showMore = document.getElementById("show-more-button");
const result = document.getElementsByClassName("search-results")[0];
let images = [];
let page = 1;

function renderImages() {
   images.map((image) => {
      const div = document.createElement("div");
      div.classList.add("search-result");
      const img = document.createElement("img");
      img.src = image?.urls?.raw;
      img.alt = image?.alt_description;
      const a = document.createElement("a");
      a.innerText = image?.alt_description;
      a.href = image?.links?.download;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      div.appendChild(img);
      div.appendChild(a);

      result.appendChild(div);
      showMore.style.display = "block";
   });
}

async function getResult(e) {
   e?.preventDefault();

   const res = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${searchInput.value}&client_id=RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw`
   );
   const data = await res.json();
   images.push(...data?.results);

   renderImages();
}

function handleShowMore() {
   page++;
   getResult();
}

searchInput.addEventListener("input", () => {
   images = [];
   page = 1;
   result.innerHTML = "";
   showMore.style.display = "none";
});
searchBtn.addEventListener("click", getResult);
showMore.addEventListener("click", handleShowMore);
