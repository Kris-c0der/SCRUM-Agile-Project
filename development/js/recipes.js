// var dataArray = localStorage.getItem('recipsList').split(',');
// // console.log(dataArray);
const nameUser = document.querySelector(".icons");

if(localStorage.savedName != null){
        nameUser.innerText = localStorage.savedName;
}

let dataTab = JSON.parse(localStorage.getItem('recipsList'));
console.log(dataTab);
const allRecipe = document.querySelector('.all-recipes');

if(dataTab != null){
        for (let i = 0; i < dataTab.length; i++) {
                const newDiv = document.createElement('div');
                newDiv.className = 'recipes';

                const pId = document.createElement('p');
                pId.className = 'recipes-id';

                const pName = document.createElement('p');
                pName.className = 'recipes-name';

                const pDesc = document.createElement('p');
                pDesc.className = 'recipes-description';

                const pAction = document.createElement('p');
                pAction.className = 'recipes-action';

                allRecipe.appendChild(newDiv);
                newDiv.appendChild(pId).innerText = i + 1;
                newDiv.appendChild(pName).innerText = dataTab[i].nameRecipe;
                newDiv.appendChild(pDesc).innerText = dataTab[i].description;
                newDiv.appendChild(pAction);
        }
}


// MODAL WINDOW !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

const AddRec = document.querySelector(".addRec");

const modalEl = document.querySelector(".modal-window");
const planEl = document.querySelector(".add-recipes-section");


AddRec.addEventListener("click", function() {
        modalEl.style.display = "flex";
        planEl.style.display = "block";

        console.log("click");
});


///////////////////*New Recipes - Logic*///////////////////////
const btnElIns = document.querySelector('.instruction-btn');
const textAreaInst = document.querySelector('#instruction-input');
const olEl = document.querySelector('.instruction-list');
let instructionAll = [];

//Event dodanie instrukcji
btnElIns.addEventListener('click',function (e) {
        console.log('click');
        e.preventDefault();
        const textAreaInstValue = document.querySelector('#instruction-input').value;
        if (textAreaInstValue.length < 150) {
                const newLi = document.createElement('li');
                olEl.appendChild(newLi);
                newLi.innerText = textAreaInstValue;
                instructionAll.push(textAreaInstValue);
                textAreaInst.value = '';
        } else {
                alert('Maksymalna liczba znaków: 150');
        }
});

//Event dodanie składnika
const btnElIng = document.querySelector('.ingredients-btn');
const ulEl = document.querySelector('.ingredients-list');
const inputIng = document.querySelector('#ingredients-input');
let ingrediendsAll = [];

btnElIng.addEventListener('click',function (e) {
        e.preventDefault();
        const inputIngValue = document.querySelector('#ingredients-input').value;
        if (inputIngValue.length < 50) {
                const newLi2 = document.createElement('li');
                ulEl.appendChild(newLi2);
                newLi2.innerText = inputIngValue;
                ingrediendsAll.push(inputIngValue);
                inputIng.value ='';
        } else {
                alert('Maksymalna liczba znaków: 50');
        }
});

//Nazwa i opis przepisu
const nameRecipInput = document.querySelector('#recipe-name');
const decriptionInput = document.querySelector('#recipe-description');
const saveBtnEl = document.querySelector('#save-recipes-btn');
const formEl = document.querySelector('#form-add-recipe');

formEl.addEventListener('submit', function (element) {
        console.log('submit');
        let decriptionInputVal = document.querySelector('#recipe-description').value;
        let nameRecipInputVal = document.querySelector('#recipe-name').value;
        if (decriptionInputVal.length >50 && nameRecipInputVal.length >360){
                element.preventDefault();
                alert('Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Nazwa przepisu": 50, dla "Opis Przepisu": 360.')
        } else {
                let recipeList = JSON.parse(localStorage.getItem("recipsList"));
                if (recipeList === null) {
                        recipeList = [];
                }
                recipeList.push({nameRecipe: nameRecipInputVal, description: decriptionInputVal,  instruction: instructionAll, ingrediends: ingrediendsAll});
                localStorage.setItem("recipsList", JSON.stringify(recipeList));
                modalEl.style.display = 'none';
                planEl.style.display = 'none';
                decriptionInputVal = '';
                nameRecipInputVal = '';
                ingrediendsAll = [];
                instructionAll = [];
                nameRecipInput.value = '';
                decriptionInput.value = '';
                olEl.innerHTML = '';
                ulEl.innerHTML = '';

        }
});

// kliknięcie poza oknem zamyka modal //

window.onclick = function(event) {
        if (event.target == modalEl) {
                modalEl.style.display = "none";
        }
};


