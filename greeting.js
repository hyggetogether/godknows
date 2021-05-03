const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
//이름을 로컬스토리지에 저장한다

function handleSudmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
//입력창이 리셋되는 걸 막고, paintGreeting과 saveName에 currentValue를 준다

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSudmit);
}
//이름을 물어본다. submit하면 handleSubmit이 작동한다

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}
//입력필드를 지우고 greeting을 보여준다. greeting의 텍스트르 변경한다

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
//이름을 불러온다. currentUser가 null이면 이름을 물어보고 아니면 paintGreeting을 불러온다.

function init() {
  loadName();
}

init();
