const nameUser = document.querySelector('.icons');
const form = document.querySelector('form');
const inpText = document.querySelector('#value');
const secForm = document.querySelector('.nav-welcome');

form.addEventListener('submit', function (elem) {
    elem.preventDefault();
        nameUser.innerText = inpText.value;
        var userName = inpText.value;
        localStorage.setItem('savedName', userName);
        console.log("Twoje imie zapisane w LS to:  ", localStorage.savedName);
        secForm.style.display = 'none';

});

if(localStorage.length > 0){
    secForm.style.display = 'none';
    nameUser.innerText = localStorage.savedName;
}