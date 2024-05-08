import { collapseNavigation, getCurrentNavigation, getNavigationNavLinks } from "./utils.js";

const navigation = getCurrentNavigation();
const navLinks = getNavigationNavLinks();

// On-Click Active NavLink Switch
navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        navLink.classList.add("active");

        collapseNavigation();
    });
});

// Logo Click
/** @type {HTMLAnchorElement} */
const websiteLogo = navigation.querySelector(".website-logo");

websiteLogo.addEventListener("click", () => {
    navLinks.forEach((navLink) => navLink.classList.remove("active"));

    collapseNavigation();
});
