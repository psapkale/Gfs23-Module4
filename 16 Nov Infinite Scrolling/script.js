const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");
const url =
   "https://api.unsplash.com/photos/random/?client_id=_DDIVJSgdK-GI1wA3aHOtxC9YTt8tCY6-4jMk7guznY&count=10";
let ready = true;

async function getPhotos() {
   loader.style.display = "none";
   const res = await fetch(url);
   const data = await res?.json();

   data?.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo?.urls.regular;
      img.alt = photo?.alt_description;
      imgContainer.appendChild(img);
   });
}
getPhotos();

window.addEventListener("scroll", function () {
   if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight + 23 &&
      ready
   ) {
      let timer;
      clearTimeout(timer);
      getPhotos();
      ready = false;
      timer = setTimeout(() => {
         ready = true;
      }, 2000);
   }
   console.log(
      window.innerHeight,
      window.scrollY,
      window.innerHeight + window.scrollY,
      document.body.offsetHeight + 23
   );
});
