let body = document.querySelector("body");
let addTaskDiv = document.querySelector("body .addTask");
let toDoListDiv = document.querySelector("body .toDoList");
let listDiv = document.querySelector(".right .list");
let title = document.querySelector(".upper-part h2");
let allArr = [];
let savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  allArr = JSON.parse(savedTasks);
}

function addTaskBtn() {
  body.classList.replace("bg-white", "bg-secondary");
  toDoListDiv.classList.replace("d-block", "d-none");
  addTaskDiv.classList.replace("d-none", "d-block");
}

function cancleAddTask() {
  body.classList.replace("bg-secondary", "bg-white");
  toDoListDiv.classList.replace("d-none", "d-block");
  addTaskDiv.classList.replace("d-block", "d-none");
}
function addTask() {
  let addTaskInput = document.querySelector(".addTaskInput");
  let taskValue = addTaskInput.value;
  if (taskValue !== "") {
    let obj = {
      task: taskValue,
      isDone: false,
    };
    addTaskInput.value = "";
    allArr.push(obj);
    cancleAddTask(); //look weird i know
    renderAll();
    localStorage.setItem("tasks", JSON.stringify(allArr));
  }
}

function renderAll() {
  title.innerText = "All";
  listDiv.innerHTML = "";
  allArr.forEach((ele, index) => {
    listDiv.innerHTML += `
        <div class="toDo d-flex justify-content-between" onclick="toggleTaskDone(${index})">
            <p>${ele.task}</p>
            <input class="form-check-input" type="checkbox" ${
              ele.isDone == true ? "checked" : null
            }/>
          </div>
        `;
  });
}

function renderToDo() {
  title.innerText = "To-Do";
  listDiv.innerHTML = "";
  allArr.forEach((ele, index) => {
    if (ele.isDone == false) {
      listDiv.innerHTML += `
        <div class="toDo d-flex justify-content-between" onclick="toggleTaskDone(${index})">
            <p>${ele.task}</p>
            <input class="form-check-input" type="checkbox" ${
              ele.isDone == true ? "checked" : null
            }/>
          </div>
        `;
    }
  });
}
function renderDone() {
  title.innerText = "Done";
  listDiv.innerHTML = "";
  allArr.forEach((ele, index) => {
    if (ele.isDone == true) {
      listDiv.innerHTML += `
          <div class="toDo d-flex justify-content-between" onclick="toggleTaskDone(${index})">
              <p>${ele.task}</p>
              <input class="form-check-input" type="checkbox" ${
                ele.isDone == true ? "checked" : null
              }/>
            </div>
          `;
    }
  });
}

function toggleTaskDone(index) {
  allArr[index].isDone = !allArr[index].isDone;
  localStorage.setItem("tasks", JSON.stringify(allArr));
  renderAll();
}

renderAll();
