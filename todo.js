import "./styles.css";

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDINGLIST_LS = " pending";
const FINISHEDLIST_LS = "finished";

let pending = [];
let finished = [];

function filterFn(toDo) {
  return toDo.id === 1;
}

function deletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanToDos = pending.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pending = cleanToDos;
  saveToDo();
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finished = cleanToDos;
  saveToDo();
}

function finishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.children[0].innerText;
  paintFinished(text);
  pendingList.removeChild(li);
  const cleanToDos = pending.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pending = cleanToDos;
  saveToDo();
}

function backToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.children[0].innerText;
  paintPending(text);
  finishedList.removeChild(li);
  const cleanToDos = finished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finished = cleanToDos;
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(PENDINGLIST_LS, JSON.stringify(pending));
  localStorage.setItem(FINISHEDLIST_LS, JSON.stringify(finished));
}

function paintPending(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pending.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deletePending);
  finBtn.innerHTML = "✅";
  finBtn.addEventListener("click", finishedToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const pendingObj = {
    text: text,
    id: newId
  };
  pending.push(pendingObj);
  saveToDo();
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finished.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteFinished);
  backBtn.innerHTML = "⏪";
  backBtn.addEventListener("click", backToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId
  };
  finished.push(finishedObj);
  saveToDo();
}

function handleSudmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPending = localStorage.getItem(PENDINGLIST_LS);
  const loadedFinished = localStorage.getItem(FINISHEDLIST_LS);

  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (toDoPending) {
      paintPending(toDoPending.text);
    });
  }

  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (toDoFinished) {
      paintFinished(toDoFinished.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSudmit);
}

init();
