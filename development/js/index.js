document.addEventListener('DOMContentLoaded', function() {

    /* CAROUSEL */

    const prev = document.querySelector("#prevPicture");
    const next = document.querySelector("#nextPicture");
    const allPictures = document.querySelectorAll(".carousel li");
    let index = 0;

    allPictures[0].classList.add("visible");
    prev.addEventListener("click", function () {

        allPictures[index].classList.remove("visible");
        index--;
        if (index < 0) {
            index = allPictures.length - 1;
        }
        allPictures[index].classList.add("visible");
    });

    next.addEventListener("click", function () {

        allPictures[index].classList.remove("visible");
        index++;
        if (index > allPictures.length - 1) {
            index = 0;
        }
        allPictures[index].classList.add("visible");
    });


});