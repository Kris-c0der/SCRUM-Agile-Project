const nameUser = document.querySelector('.icons');
const form = document.querySelector('form');
const inpText = document.querySelector('#value');

form.addEventListener('submit', function (elem) {
    elem.preventDefault();
        nameUser.innerText = inpText.value;
        var userName = inpText.value;
        localStorage.setItem('savedName', userName);
        console.log("Twoje imie to: ", localStorage.savedName )

});