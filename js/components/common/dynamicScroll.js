export function animateOnScroll() {

    const path = window.location.pathname;
    const header = document.querySelector(".header");
    const cards = document.querySelectorAll(".card-container");

    if (path !== "/commissions.html" && path !== "/details.html") {
        window.addEventListener("scroll", function () {


            if (window.pageYOffset > 0) {
                header.classList.add("header--solid");
                cards.forEach(card => {
                    card.classList.add("card-container--fadein");
                })
            } else if (window.pageYOffset === 0) {
                header.classList.remove("header--solid");
                cards.forEach(card => {
                    card.classList.remove("card-container--fadein");
                })
            }

        })
    } else {
        setTimeout(function () {
            cards.forEach(card => {
                card.classList.add("card-container--fadein");
            })
        }, 100)

        window.addEventListener("scroll", function () {
            if (window.pageYOffset > 0) {
                header.classList.add("header--solid");
            } else if (window.pageYOffset === 0) {
                header.classList.remove("header--solid");
            }
        })
    }
}