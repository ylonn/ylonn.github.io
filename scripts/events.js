import { getCurrentNavigation, getNavigationNavLinks, redirect } from "./utils.js";

// On-Load Main Section Redirection
document.addEventListener("readystatechange", () => {
    redirect("#");
});

// On-Scroll Active NavLink Switch
document.addEventListener("scroll", () => {
    /** @type {HTMLElement} */
    const navigation = getCurrentNavigation();
    if (navigation.id !== "navigation") return;

    const navLinks = getNavigationNavLinks();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const elementId = entry.target.id;
            /** @type {HTMLAnchorElement} */
            const navLink = document.getElementById(`#${elementId}`);

            if (entry.isIntersecting && entry.intersectionRatio > 0.1) return navLink.classList.add("active");
            navLink.classList.remove("active");
        });
    });

    navLinks.forEach((navLink) => {
        const section = document.getElementById(navLink.id.slice(1));
        if (section) observer.observe(section);
    });
});
