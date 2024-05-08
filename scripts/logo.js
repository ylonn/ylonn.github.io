/** @type {NodeListOf<SVGSVGElement>} */
const socials = document.querySelectorAll("svg.social");

socials.forEach((social) => {
    social.addEventListener("mouseenter", () => {
        social.classList.remove("text-dark");
        social.classList.add("text-light");
    });

    social.addEventListener("mouseleave", () => {
        social.classList.add("text-dark");
        social.classList.remove("text-light");
    });
});
