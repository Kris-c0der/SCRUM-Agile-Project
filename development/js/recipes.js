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
        e.preventDefault();
        const textAreaInstValue = document.querySelector('#instruction-input').value;
        if (textAreaInstValue.length < 150 && textAreaInstValue.length >0) {
                const newLi = document.createElement('li');
                newLi.classList.add('liIconsEl');
                olEl.appendChild(newLi);
                newLi.innerText = textAreaInstValue;
                const lielement = document.querySelector('.instruction-list li');
                if (lielement !== null) {
                        const NewSpanEl = document.createElement('span');
                        const NewSpanSecEl = document.createElement('span');
                        NewSpanEl.classList.add('span-icon');
                        NewSpanSecEl.classList.add('span-delete-icon');
                        newLi.appendChild(NewSpanEl);
                        newLi.appendChild(NewSpanSecEl);
                        NewSpanSecEl.addEventListener('click',function () {
                                console.log('click');
                                newLi.remove();
                        });
                }
                instructionAll.push(textAreaInstValue);
                textAreaInst.value = '';
        } else if (textAreaInstValue.length === 0) {
                alert('Wprowadź instrukcję');
        } else {
                alert('Maksymalna liczba znaków: 150 - Skróć instrukcję');
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
        if (inputIngValue.length < 50 && inputIngValue.length >0) {
                const newLi2 = document.createElement('li');
                ulEl.appendChild(newLi2);
                newLi2.innerText = inputIngValue;
                const lielement2 = document.querySelector('.ingredients-list li');
                if (lielement2 !== null) {
                        const NewSpanEl2 = document.createElement('span');
                        const NewSpanSecEl2 = document.createElement('span');
                        NewSpanEl2.classList.add('span-icon');
                        NewSpanSecEl2.classList.add('span-delete-icon');
                        newLi2.appendChild(NewSpanEl2);
                        newLi2.appendChild(NewSpanSecEl2);
                        NewSpanSecEl2.addEventListener('click',function () {
                                console.log('click');
                                newLi2.remove();
                        });
                }
                ingrediendsAll.push(inputIngValue);
                inputIng.value ='';
        } else if (inputIngValue.length === 0) {
                alert('Wprowadź nazwę składnika');
        } else {
                alert('Maksymalna liczba znaków: 50 - Skróć nazwę składnika')
        }
});
//Nazwa i opis przepisu
const nameRecipInput = document.querySelector('#recipe-name');
const decriptionInput = document.querySelector('#recipe-description');
const saveBtnEl = document.querySelector('#save-recipes-btn');
const formEl = document.querySelector('#form-add-recipe');

formEl.addEventListener('submit', function (element) {
        let decriptionInputVal = document.querySelector('#recipe-description').value;
        let nameRecipInputVal = document.querySelector('#recipe-name').value;
        if (nameRecipInputVal.length > 50 ) {
                element.preventDefault();
                alert('Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Nazwa przepisu": 50')
        }else if (nameRecipInputVal.length === 0) {
                alert('Nazwa przepisu musi zostać uzupełniona');
        }else if (decriptionInputVal.length === 0) {
                alert('Opis przepisu musi zostać uzupełniony');
        }else if (decriptionInputVal.length >360) {
                alert('Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Opis przepisu": 360')
        }else {
                alert('Przepis wprowadzony prawidłowo');
                let recipeList = JSON.parse(localStorage.getItem("recipsList"));
                if (recipeList === null) {
                        recipeList = [];
                }
                recipeList.push({
                        nameRecipe: nameRecipInputVal,
                        description: decriptionInputVal,
                        instruction: instructionAll,
                        ingrediends: ingrediendsAll
                });
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


