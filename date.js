const dateInfo = document.querySelector(".js-date");
const dateInf = dateInfo.querySelector("h2");

function getDate() {
  const todayDate = new Date();
  console.log(todayDate);

  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const date = todayDate.getDate();
  const day = todayDate.getDay();

  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];
  console.log(year, month, date, dayArray[day]);

  dateInfo.innerHTML = `${year}년 ${month}월 ${date}일 ${dayArray[day]}요일`;
}
function init() {
  getDate();
}

init();
