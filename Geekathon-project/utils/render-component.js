function nodeParser(elem) {
   const parser = new DOMParser();
   const doc = parser.parseFromString(elem, "text/html");
   const node = doc.body.firstChild;

   return node;
}

function geminiToHTML(geminiText) {
   const lines = geminiText.split("\n");
   let html =
      "<div class='md:w-[80vw] px-4 pb-10 my-10 mx-auto flex gap-2 items-start flex-col text-lg border-b border-slate-200'><h1 class='text-sm font-bold mb-2'>From Gemini:</h1>";
   let inList = false;

   lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const processedLine = trimmed.replace(
         /\*\*(.*?)\*\*/g,
         '<b class="font-bold">$1</b>'
      );

      if (processedLine.startsWith("* ")) {
         if (!inList) {
            html += '<ul class="list-disc pl-6 space-y-1">';
            inList = true;
         }
         html += `<li class="text-gray-800">${processedLine.slice(2)}</li>`;
      } else {
         if (inList) {
            html += "</ul>";
            inList = false;
         }

         html += `<p class="text-slate-800">${processedLine}</p>`;
      }
   });

   if (inList) {
      html += "</ul>";
   }
   html += "</div>";

   return html;
}

function extractTextFromLink(url) {
   let showTitle = url?.split(".");

   return showTitle.length > 2 ? showTitle[1] : showTitle[0];
}

const renderGoogleSearchComponent = (data) => {
   const ele = `<div
   class="md:w-[80vw] px-4 my-10 mx-auto flex gap-1 items-start justify-between"
   >
   <div class="flex gap-1 flex-col">
      <a
         href=${data?.link}
         target="_blank"
         class="flex items-center gap-2"
      >
         ${
            data?.pagemap?.cse_thumbnail?.length
               ? `<img
            src=${data?.pagemap?.cse_thumbnail[0]?.src}
            alt=""
            class="w-6 h-6 rounded-full"
            />`
               : ""
         }
         <div class="flex flex-col">
            <span class="text-sm capitalize">${extractTextFromLink(
               data?.displayLink.toString()
            )}</span>
            <span class="text-xs"
               >${data?.link}</span
            >
         </div>
      </a>
   
      <a
         href=${data?.link}
         target="_blank"
         class="text-xl text-[#518df8] hover:underline"
         >${data?.title}</a
      >
   
      <div class="md:w-[70%] text-[#404040] text-[14px]">
         ${data?.htmlSnippet}
      </div>
   </div>
   
   ${
      data?.pagemap?.cse_image?.length
         ? `<img
      src=${data?.pagemap?.cse_image[0]?.src}
      alt=""
      class="hidden sm:block w-[80px] h-[80px] rounded-lg"
      />`
         : ""
   }
   </div>`;

   return nodeParser(ele);
};

const renderImageSearchComponent = (data) => {
   const ele = `<a
      href=${data?.urls?.regular}
   >
      <img
         src=${data?.urls?.regular}
         alt=${data?.slug}
         class="w-[90vw] h-[500px] sm:w-[400px] object-cover"
      />
   </a>`;

   return nodeParser(ele);
};

const renderWikipediaComponent = (data) => {
   const url = `https://en.wikipedia.org/wiki/${data?.title
      ?.split(" ")
      .join("_")}`;
   const date = data?.timestamp?.split("T")[0];
   const ele = `<div
      class="md:w-[80vw] px-4 my-10 mx-auto flex items-start justify-between flex-col"
   >
      <a
         href=${url}
         target="_blank"
         class="block text-[#111] text-lg font-bold hover:underline"
         >${data?.title}</a
      >
      <span class="text-[12px] text-[#707070]">${date}</span>
      <div class="md:w-[80%] text-[#404040] text-[14px]">
         ${data?.snippet}
      </div>
   </div>`;

   return nodeParser(ele);
};

const renderGeminiComponent = (data) => {
   return geminiToHTML(data);
};
