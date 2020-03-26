const nameUser = document.querySelector(".icons");
const form = document.querySelector("form");
const inpText = document.querySelector("#value");
const secForm = document.querySelector(".nav-welcome");
const mainSect = document.querySelector(".main-section");
console.log(mainSect);

form.addEventListener("submit", function(elem) {
  elem.preventDefault();
  nameUser.innerText = inpText.value;
  var userName = inpText.value;
  localStorage.setItem("savedName", userName);
  console.log("Twoje imie zapisane w LS to:  ", localStorage.savedName);
  secForm.style.display = "none";
  mainSect.style.display = "block";
});

if (localStorage.length > 0) {
  secForm.style.display = "none";
  nameUser.innerText = localStorage.savedName;
  mainSect.style.display = "block";
}
// Show modal //

const btnAddRecipie = document.querySelector("#add-reciepes");
const btnAddPlan = document.querySelector("#add-plan");

const modalEl = document.querySelector(".modal-window");
const planEl = document.querySelector(".add-recipes-section");


btnAddRecipie.addEventListener("click", function() {
  modalEl.style.display = "flex";
  planEl.style.display = "block";

  console.log("click");
});

btnAddPlan.addEventListener("click", function() {
  modalEl.style.display = "flex";
  // dodać element który będzie ustawiał display block dla elementu plan //
  console.log("click");
});
