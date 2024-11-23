let todos = [];
let display = document.querySelector(".display-this");

function addTasks() {
  let taskInput = document.getElementById("taskInput");
  let dueDate = document.getElementById("dateInput");
  let formatedDate = new Date(dueDate.value);
  let date = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit", // You can include seconds if you want, using 'second'
    hour12: true, // Use 12-hour format, or set to false for 24-hour format
  };

  let tempDate = {
    Task: taskInput.value,
    DueDate: formatedDate.toLocaleDateString("en", date),
  };
  // want to display placeholder again if someone click the plus button
  taskInput.value = ""; //input field che etle  value use karvu pade innerText ni jagyae

  display.classList.add("d-none");
  todos.push(tempDate);
  let pushUnder = document.getElementById("pushHere");
  // First Clear all the card before making them appear again
  renderTask();
}

displayInput = () => {
  display.classList.remove("d-none");
};

deletetasks = () => {
  let cards = document.querySelector(".cards");
  // Remove all child elements
  cards.innerHTML = "";
};

function editIt() {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card, i) => {
    let pencil = card.querySelector(".edit");
    pencil.addEventListener("click", () => {
      let taskInput = card.querySelector(".taskDisplay");
      taskInput.readOnly = false;
      taskInput.focus();

      let handleInput = (e) => {
        if (e.key === "Enter" || e.type === "blur") {
          taskInput.readOnly = true;
          todos[i].Task = taskInput.value;
          console.log(todos);

          // event listner remove karo je thi fari repeat na thay nava ave to
          taskInput.removeEventListener("keydown", handleInput);
          taskInput.removeEventListener("blur", handleInput);
        }
      };

      taskInput.addEventListener("keydown", handleInput);
      taskInput.addEventListener("blur", handleInput);
    });
  });
}

function deleteIt() {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card, i) => {
    let trash = card.querySelector(".delete");
    trash.addEventListener("click", () => {
      card.classList.add("fade-out-up");
      // have wait karvi padse 0.5second ni eni pehla element remove na thavo joie etle settieout use karisu
      setTimeout(() => {
        card.remove();
        todos.splice(i, 1);
        console.log(todos);
        renderTask();
      }, 500);
    });
  });
}

function renderTask() {
  deletetasks();
  let pushUnder = document.getElementById("pushHere");
  // First Clear all the card before making them appear again
  todos.forEach((taskAdded) => {
    // Structured the displaying task
    let card = document.createElement("div");
    card.classList.add("card");
    pushUnder.appendChild(card);
    let cardFlex = document.createElement("div");
    cardFlex.classList.add("card-flex");
    card.appendChild(cardFlex);
    let gap = document.createElement("div");
    gap.classList.add("gap");
    cardFlex.appendChild(gap);
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    // Set multiple attributes at once
    Object.assign(checkBox, {
      type: "checkbox",
      value: "yes", // Value sent when checkbox is checked
    });
    checkBox.classList.add("completeTask");
    gap.appendChild(checkBox);
    let taskDisplay = document.createElement("input");
    taskDisplay.classList.add("taskDisplay");
    taskDisplay.readOnly = true;
    gap.appendChild(taskDisplay);
    let dateDisplay = document.createElement("p");
    dateDisplay.classList.add("dateDisplay");
    card.appendChild(dateDisplay);

    // now apply values to the card
    taskDisplay.value = taskAdded.Task;
    dateDisplay.innerText = taskAdded.DueDate;

    let pencil = `<svg class="edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5f5f5f" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>`;
    let trash = `<svg class="delete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5f5f5f" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                          </svg>`;
    let gap1 = document.createElement("div");
    gap1.classList.add("gap1");
    cardFlex.appendChild(gap1);
    gap1.innerHTML = pencil + trash;
  });
  pencil = document.querySelector(".edit");
  pencil.addEventListener("click", editIt());

  trash = document.querySelector(".delete");
  trash.addEventListener("click", deleteIt());
}
