var dataArray = localStorage.getItem('recipsList').split('2');
// console.log(dataArray);

let dataTab = JSON.parse(localStorage.getItem('recipsList'));
console.log(dataTab);
const allRecipe = document.querySelector('.all-recipes');
// const recipe = document.querySelector('.recipes');
// const recipeID = document.querySelector('.recipes-id');
// const recipeName = document.querySelector('.recipes-name');
// const recipeDesc = document.querySelector('.recipes-description');
// const recipeAction = document.querySelector('.recipes-action');

// const newDiv = document.createElement('div');
// newDiv.className = 'recipes';
const pId = document.createElement('p');
pId.className = 'recipes-id';
const pName = document.createElement('p');
pName.className = 'recipes-name';
const pDesc = document.createElement('p');
pDesc.className = 'recipes-description';
const pAction = document.createElement('p');
pAction.className = 'recipes-action';

console.log(dataTab.length);

for(let i = 0; i < dataTab.length; i++){
        let newDiv = document.createElement('div');
        newDiv.className = 'recipes';
        allRecipe.appendChild(newDiv);
        newDiv.appendChild(pId).innerText = i + 1;
        newDiv.appendChild(pName).innerText = dataTab[i].nameRecipe;
        newDiv.appendChild(pDesc).innerText = dataTab[i].description;
        newDiv.appendChild(pAction);
        console.log(i)
}

// for(let i = 0; i < dataTab.length; i++){
//     for(let key in dataTab[i]){
//         for(let j = 0; j < dataTab[i][key].length; j++)
//             console.log(dataTab[i][key][j])
//     }
// }

