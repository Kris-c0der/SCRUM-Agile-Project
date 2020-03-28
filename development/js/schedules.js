const nameUser = document.querySelector(".icons");

if(localStorage.savedName != null){
    nameUser.innerText = localStorage.savedName;
}

let planTab = JSON.parse(localStorage.getItem('planSchedule'));
console.log(planTab);
const allSchedule = document.querySelector('.all-schedules');

for (let i = 0; i < planTab.length; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = 'schedules';

    const pId = document.createElement('p');
    pId.className = 'schedules-id';

    const pName = document.createElement('p');
    pName.className = 'schedules-name';

    const pDesc = document.createElement('p');
    pDesc.className = 'schedules-description';

    const pWeek = document.createElement('p');
    pWeek.className = 'schedules-week';

    const pAction = document.createElement('p');
    pAction.className = 'schedules-action';

    allSchedule.appendChild(newDiv);
    newDiv.appendChild(pId).innerText = i + 1;
    newDiv.appendChild(pName).innerText = planTab[i].namePlan;
    newDiv.appendChild(pDesc).innerText = planTab[i].descriptionPlan;
    newDiv.appendChild(pWeek).innerText = planTab[i].planWeek.length;
    newDiv.appendChild(pAction);
}
