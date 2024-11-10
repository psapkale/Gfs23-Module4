const text = document.getElementById("text");
const color = document.getElementById("color");
const container = document.getElementById("notes__container");
const no__text = document.getElementById("notesNotAdded");
const createBtn = document.getElementById("create__note");

function createNote() {
   if (text.value === "") {
      alert("You can write the note for later");
      return;
   }
   if (no__text) no__text.remove();

   const note = document.createElement("div");
   note.classList.add("note");
   note.style.backgroundColor = color.value;
   note.setAttribute("draggable", "true"); // Make the note draggable

   const content = document.createElement("h3");
   content.innerText = text.value;
   content.style.display = "block";

   const deleteBtn = document.createElement("button");
   deleteBtn.innerText = "X";
   deleteBtn.addEventListener("click", () => note.remove());

   note.appendChild(content);
   note.appendChild(deleteBtn);
   container.appendChild(note);

   // Drag and drop functionality
   note.addEventListener("dragstart", dragStart);
   note.addEventListener("dragend", dragEnd);

   container.addEventListener("dragover", dragOver);
   container.addEventListener("drop", drop);
}

let draggedNote = null;

function dragStart(e) {
   draggedNote = e.target;
   e.dataTransfer.effectAllowed = "move"; // Indicate that this is a move operation
}

function dragEnd(e) {
   draggedNote = null; // Clear the reference when dragging ends
}

function dragOver(e) {
   e.preventDefault();
}

function drop(e) {
   e.preventDefault();

   if (e.target.classList.contains("note") && draggedNote !== e.target) {
      container.insertBefore(draggedNote, e.target);
   } else if (e.target === container) {
      // If dropped on the container, append it at the end
      container.appendChild(draggedNote);
   }
}

createBtn.addEventListener("click", createNote);
