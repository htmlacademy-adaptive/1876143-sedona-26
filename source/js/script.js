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



/* let modal = document.querySelector(".modal-window");
console.log(modal);
let closeButton = document.querySelector(".modal-window__button");
console.log(closeButton );
closeButton.addEventListener("click", function() {
  modal.style.display= 'none';
});


let modalS = document.querySelector(".modal-windows");
console.log(modalS);
let closeButtonS = document.querySelector(".modal-windows__button");
console.log(closeButtonS );
closeButtonS.addEventListener("click", function() {
  modalS.style.display= 'none';
});
 */
