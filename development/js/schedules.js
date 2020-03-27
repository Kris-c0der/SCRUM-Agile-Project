const nameUser = document.querySelector(".icons");

if(localStorage.savedName != null){
    nameUser.innerText = localStorage.savedName;
}

// let dataTab = JSON.parse(localStorage.getItem('recipsList'));
// console.log(dataTab);
// const allRecipe = document.querySelector('.all-recipes');
//
// for (let i = 0; i < dataTab.length; i++) {
//     const newDiv = document.createElement('div');
//     newDiv.className = 'recipes';
//
//     const pId = document.createElement('p');
//     pId.className = 'recipes-id';
//
//     const pName = document.createElement('p');
//     pName.className = 'recipes-name';
//
//     const pDesc = document.createElement('p');
//     pDesc.className = 'recipes-description';
//
//     const pAction = document.createElement('p');
//     pAction.className = 'recipes-action';
//
//     allRecipe.appendChild(newDiv);
//     newDiv.appendChild(pId).innerText = i + 1;
//     newDiv.appendChild(pName).innerText = dataTab[i].nameRecipe;
//     newDiv.appendChild(pDesc).innerText = dataTab[i].description;
//     newDiv.appendChild(pAction);
// }
