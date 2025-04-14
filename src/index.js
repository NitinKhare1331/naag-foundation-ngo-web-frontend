document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const icon = document.getElementById("hamburger-icon");

    toggleBtn.addEventListener("click", () => {
        if (mobileMenu.classList.contains("max-h-0")) {
            mobileMenu.classList.remove("max-h-0");
            mobileMenu.classList.add("max-h-screen");
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            mobileMenu.classList.remove("max-h-screen");
            mobileMenu.classList.add("max-h-0");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
});
