const filterType = document.getElementById("filterType");
const filterBtn = document.getElementById("filterBtn");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");
let pokemons = [];
let pokemonCategories = [];

function fetchAllPokemons() {
   pokemonCategories.map(async (c) => {
      const res = await fetch(c?.url);
      const categoryPokemonUrls = await res?.json();
      categoryPokemonUrls?.pokemon.slice(0, 10).map(async (p) => {
         const data = await fetch(p?.pokemon.url);
         const pokemonData = await data.json();
         pokemons.push({
            abilities: pokemonData?.abilities,
            cries: pokemonData?.cries,
            id: pokemonData?.id,
            name: pokemonData?.name,
            sprites: pokemonData?.sprites,
            order: pokemonData?.order,
            types: pokemonData?.types,
         });
      });
   });
}

function renderPokemonCard(pokemon) {
   const flipCard = document.createElement("div");
   flipCard.classList.add("flip-card");
   const flipCardInner = document.createElement("div");
   flipCardInner.classList.add("flip-card-inner");
   const flipCardFront = document.createElement("div");
   flipCardFront.classList.add("flip-card-front");
   const flipCardBack = document.createElement("div");
   flipCardBack.classList.add("flip-card-back");
   flipCardInner.appendChild(flipCardFront);
   flipCardInner.appendChild(flipCardBack);
   flipCard.appendChild(flipCardInner);

   const span = document.createElement("span");
   const img = document.createElement("img");
   span.innerText = pokemon.name;
   img.src = pokemon.sprites.front_shiny;
   flipCardFront.appendChild(img);
   flipCardFront.appendChild(span);

   const typeWrapper = document.createElement("div");
   typeWrapper.classList.add("typeWrapper");
   pokemon.types.map((type) => {
      const ty = document.createElement("span");
      ty.classList.add("pokemonType");
      ty.classList.add(type.type.name);
      ty.innerText = type.type.name;
      typeWrapper.appendChild(ty);
   });
   flipCardFront.appendChild(typeWrapper);

   const backImage = document.createElement("img");
   backImage.classList.add("backImage");
   backImage.src = pokemon.sprites.front_shiny;
   const backImage2 = document.createElement("img");
   backImage2.classList.add("backImage2");
   backImage2.src = pokemon.sprites.front_shiny;
   flipCardBack.appendChild(backImage);
   flipCardBack.appendChild(backImage2);
   const abilityWrapper = document.createElement("span");
   abilityWrapper.innerText = "Abilities: ";
   abilityWrapper.style.textTransform = "capitalize";
   abilityWrapper.style.fontSize = "20px";
   abilityWrapper.style.marginTop = "40px";
   pokemon.abilities.map((ability) => {
      const a = document.createElement("span");
      a.innerText = ability.ability.name.split("-").join(" ");
      a.style.marginRight = "3px";
      abilityWrapper.appendChild(a);
   });
   flipCardBack.appendChild(abilityWrapper);

   result.appendChild(flipCard);
}

function renderPokemonsByType(type = "") {
   const filteredPokemons =
      type === ""
         ? pokemons
         : pokemons.filter((p) => {
              let isPresent = false;
              p.types.forEach((t) => {
                 if (t.type.name === type) {
                    isPresent = true;
                 }
              });
              return isPresent;
           });

   result.innerHTML = "";
   filteredPokemons.map((pokemon) => renderPokemonCard(pokemon));
}

function searchPokemonByQuery(e) {
   removeDuplicate();
   const filteredPokemons =
      e.target.value === ""
         ? pokemons
         : pokemons.filter((p) => p.name.includes(e.target.value));

   result.innerHTML = "";
   filteredPokemons.map((pokemon) => renderPokemonCard(pokemon));
}

function sortPokemonsByOrder() {
   pokemons.sort((a, b) => a.order - b.order);
}

function removeDuplicate() {
   pokemons = Array.from(new Set(pokemons.map((p) => JSON.stringify(p)))).map(
      (p) => JSON.parse(p)
   );
}

function filterPokemonsByType() {
   renderPokemonsByType(filterType.value);
}

filterBtn.addEventListener("click", filterPokemonsByType);

searchInput.addEventListener("input", searchPokemonByQuery);

(async function () {
   const data = await fetch("https://pokeapi.co/api/v2/type/");
   const res = await data.json();
   pokemonCategories = res?.results;
   fetchAllPokemons();
   result.innerText = "Loading..";
   setTimeout(() => {
      result.innerHTML = "";
      removeDuplicate();
      sortPokemonsByOrder();
      renderPokemonsByType();
   }, 3000);
})();
