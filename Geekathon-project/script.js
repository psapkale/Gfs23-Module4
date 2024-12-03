let searchQuery;
const mainContainer = document.getElementById("mainContainer");
const inputForm = document.getElementById("inputForm");
const allTab = document.getElementById("allTab");
const imagesTab = document.getElementById("imagesTab");
const wikipediaTab = document.getElementById("wikipediaTab");
const sidePanel = document.getElementById("sidePanel");
const sidebarBtn = document.getElementById("sidebarBtn");
const results = document.getElementById("results");
const loader = document.getElementById("loader");
const searchHistory = document.getElementById("searchHistory");
const inputText = document.getElementById("inputText");
let isSidebarOpen = false;

import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyCR8m1tLb5UKQNeiSQgYbNZ_h2XuJNA9sw";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function toggleSidePanel() {
   // ! resolve overflow on sidebar open
   if (isSidebarOpen) {
      sidePanel.style.transform = "translateX(-100%)";
   } else {
      sidePanel.style.transform = "translateX(0)";
   }
   isSidebarOpen = !isSidebarOpen;
}

function changeStyle(id) {
   const border = "2px solid #000";
   allTab.style.borderBottom = allTab.id === id ? border : "";
   imagesTab.style.borderBottom = imagesTab.id === id ? border : "";
   wikipediaTab.style.borderBottom = wikipediaTab.id === id ? border : "";
}

function updateHistory() {
   searchHistory.innerHTML = "";
   const history = JSON.parse(localStorage.getItem("history")) ?? [];
   history.reverse().map((h) => {
      const button = document.createElement("button");
      button.classList.add("historyItem");
      button.innerText = h;
      button.addEventListener("click", () => {
         inputText.value = h;
         const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
         });
         inputForm.dispatchEvent(submitEvent);
         toggleSidePanel();
      });
      searchHistory.appendChild(button);
   });
}

async function renderGoogleResponse() {
   if (!inputText.value.length) {
      alert("Search looks empty!!");
      return;
   }

   results.innerText = "";
   try {
      const res = await fetch(googleUrl(searchQuery));
      const data = await res.json();
      const d = data?.items;

      const div = document.createElement("div");
      div.id = "geminiResponse";
      results.appendChild(div);
      renderGeminiResponse();
      d.map((elem) => results.appendChild(renderGoogleSearchComponent(elem)));
   } catch (error) {
      console.error(error);
      alert("Failed to get response");
   }
}

async function renderGeminiResponse() {
   if (!inputText.value.length) {
      alert("Search looks empty!!");
      return;
   }

   const geminiResponse = document.getElementById("geminiResponse");
   loader.style.display = "flex";
   try {
      const prompt = searchQuery;
      const result = await model.generateContent(prompt);
      const g = result.response.text();

      loader.style.display = "none";
      geminiResponse.innerHTML = renderGeminiComponent(g);
   } catch (error) {
      console.error(error);
      alert("Failed to get response");
   }
}

async function renderImagesResponse() {
   if (!inputText.value.length) {
      alert("Search looks empty!!");
      return;
   }

   results.innerText = "";
   try {
      const res = await fetch(unsplashUrl(searchQuery));
      const data = await res.json();
      const i = data?.results;

      const div = document.createElement("div");
      div.classList.add(
         "sm:w-[80vw]",
         "my-10",
         "mx-auto",
         "flex",
         "gap-2",
         "flex-wrap",
         "items-center",
         "justify-evenly",
         "lg:justify-start"
      );
      i.map((image) => div.appendChild(renderImageSearchComponent(image)));
      results.appendChild(div);
   } catch (error) {
      console.error(error);
      alert("Failed to get response");
   }
}

async function renderWikipediaResponse() {
   if (!inputText.value.length) {
      alert("Search looks empty!!");
      return;
   }

   results.innerText = "";
   try {
      const res = await fetch(wikipediaUrl(searchQuery));
      const data = await res.json();
      const w = data?.query?.search;

      w.map((wiki) => results.appendChild(renderWikipediaComponent(wiki)));
   } catch (error) {
      console.error(error);
      alert("Failed to get response");
   }
}

function changeTab(tabId) {
   changeStyle(tabId);

   switch (tabId) {
      case allTab.id:
         renderGoogleResponse();
         break;

      case imagesTab.id:
         renderImagesResponse();
         break;

      case wikipediaTab.id:
         renderWikipediaResponse();
         break;

      default:
         alert("unrecognized tab");
         break;
   }
}

function handleSubmit(e) {
   e.preventDefault();

   searchQuery = e.target[0].value;
   if (!searchQuery.length) {
      return;
   }

   renderGoogleResponse();
   changeTab("allTab");
   const history = JSON.stringify(
      localStorage.getItem("history")
         ? [...JSON.parse(localStorage.getItem("history")), searchQuery]
         : [searchQuery]
   );
   localStorage.setItem("history", history);
   updateHistory();
}

updateHistory();
inputForm.addEventListener("submit", (event) => handleSubmit(event));
allTab.addEventListener("click", () => changeTab("allTab"));
imagesTab.addEventListener("click", () => changeTab("imagesTab"));
wikipediaTab.addEventListener("click", () => changeTab("wikipediaTab"));
sidebarBtn.addEventListener("click", toggleSidePanel);
