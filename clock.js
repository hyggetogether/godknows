const clockContainer = document.querySelector(".js-clock");
const clockTitle1 = clockContainer.querySelector("h1");
const clockTitle2 = clockContainer.querySelector("h2");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle1.innerText = `${hours < 10 ? `0${hours}` : `${hours > 12 ? `0${hours - 12}` : ` hours}`}`
    }:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
    }`;
  clockTitle2.innerText = `${hours > 11 ? `PM` : `AM`}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
