document.addEventListener("DOMContentLoaded", function () {
    // Typing Effect
    const words = ["Code Mastery", "Logic Unlocked", "Skill Enhancing"];
    let index = 0;
    let letterIndex = 0;
    let currentWord = "";
    let isDeleting = false;
    const typeText = document.getElementById("type-text");

    function typeEffect() {
        if (!isDeleting && letterIndex <= words[index].length) {
            currentWord = words[index].substring(0, letterIndex++);
        } else if (isDeleting && letterIndex >= 0) {
            currentWord = words[index].substring(0, letterIndex--);
        }

        typeText.innerHTML = currentWord + "<span class='cursor'></span>";

        if (!isDeleting && letterIndex === words[index].length) {
            setTimeout(() => isDeleting = true, 1000); // Pause before deleting
        } else if (isDeleting && letterIndex === 0) {
            setTimeout(() => {
                isDeleting = false;
                index = (index + 1) % words.length;
            }, 500); // Pause after deleting before typing new word
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();

    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach((item) => {
        item.addEventListener('click', function () {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');

            // Close other open answers
            document.querySelectorAll('.faq-item').forEach((otherItem) => {
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Navigation Menu and Theme Toggle
    const menuButton = document.querySelector(".menu-btn");
    const paletteButton = document.querySelector(".palette-btn");
    const menuDropdown = document.getElementById("menuDropdown");
    const paletteDropdown = document.getElementById("paletteDropdown");
    const colorOptions = document.querySelectorAll(".color-option");
    const body = document.body;
    const gridlines = document.getElementById("gridlines");

    if (menuButton && menuDropdown) {
        menuButton.addEventListener("click", function (e) {
            e.stopPropagation();
            menuDropdown.style.display = (menuDropdown.style.display === "grid") ? "none" : "grid";
        });
    }

    if (paletteButton && paletteDropdown) {
        paletteButton.addEventListener("click", function (e) {
            e.stopPropagation();
            paletteDropdown.style.display = (paletteDropdown.style.display === "grid") ? "none" : "grid";
        });
    }

    // Hide dropdowns when clicking outside
    document.addEventListener("click", function (e) {
        if (menuDropdown && !menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
            menuDropdown.style.display = "none";
        }
        if (paletteDropdown && !paletteButton.contains(e.target) && !paletteDropdown.contains(e.target)) {
            paletteDropdown.style.display = "none";
        }
    });

    // Theme Switching Logic
    colorOptions.forEach(option => {
        option.addEventListener("click", function () {
            const selectedColor = option.getAttribute("data-color");

            if (selectedColor === "dim") {
                body.className = "dim-mode";
                gridlines.style.background = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"50\" viewBox=\"0 0 50 50\"><rect width=\"50\" height=\"50\" fill=\"none\" stroke=\"white\" stroke-width=\"1\" /></svg>') repeat";

                document.getElementById("logo").style.color = "white";
                document.getElementById("h1").style.color = "white";
                document.querySelectorAll(".faq-answer").forEach(el => el.style.color = "white");
                document.querySelectorAll(".card-back p").forEach(el => el.style.color = "white");
            } 
            else if (selectedColor === "dark") {
                body.className = "dark-mode";
                gridlines.style.background = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"50\" viewBox=\"0 0 50 50\"><rect width=\"50\" height=\"50\" fill=\"none\" stroke=\"white\" stroke-width=\"1\" /></svg>') repeat";

                document.getElementById("logo").style.color = "white";
                document.getElementById("type-text").style.color = "white";
                document.querySelectorAll(".faq-answer").forEach(el => el.style.color = "white");
                document.querySelectorAll(".card-back p").forEach(el => el.style.color = "white");
            } 
            else {
                body.className = "";
                gridlines.style.background = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"50\" viewBox=\"0 0 50 50\"><rect width=\"50\" height=\"50\" fill=\"none\" stroke=\"black\" stroke-width=\"1\" /></svg>') repeat";
                body.style.background = selectedColor;

                document.getElementById("logo").style.color = "black";
                document.getElementById("type-text").style.color = "black";
                document.querySelectorAll(".faq-answer").forEach(el => el.style.color = "black");
                document.querySelectorAll(".card-back p").forEach(el => el.style.color = "black");
            }
        });
    });
});
