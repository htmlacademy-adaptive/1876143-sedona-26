let navMain = document.querySelector(".main-navigation");
console.log(navMain);
let navToggle = document.querySelector(".toggle");
console.log(navToggle);

navMain.classList.remove("main-navigation--nojs");
console.log(navMain);
navToggle.addEventListener("click", function () {
  if(navMain.classList.contains("main-navigation--closed")) {
    navMain.classList.remove("main-navigation--closed");
    navMain.classList.add("main-navigation--opened");
  } else {
    navMain.classList.add("main-navigation--closed");
    navMain.classList.remove("main-navigation--opened");
  }
});
