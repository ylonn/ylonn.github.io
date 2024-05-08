export const MOBILE_MAX_WIDTH = 767.98;

/**
 * @returns {HTMLElement}
 */
export function getCurrentNavigation() {
    /** @type {[HTMLElement, HTMLElement]} */
    const [navigation, navigationCollapse] = [document.querySelector(`nav#navigation`), document.querySelector(`nav#navigation-collapse`)];
    return document.body.clientWidth + 13 > MOBILE_MAX_WIDTH ? navigation : navigationCollapse;
}

/**
 * @returns {NodeListOf<HTMLAnchorElement>}
 */
export function getNavigationNavLinks() {
    return getCurrentNavigation().querySelectorAll("a.nav-link");
}

export function collapseNavigation() {
    const navigation = getCurrentNavigation();
    if (navigation.id !== "navigation-collapse") return;

    /** @type {HTMLButtonElement} */
    const navigationToggle = document.querySelector("button.navbar-toggler");
    if (navigationToggle.ariaExpanded === "true") navigationToggle.click();
}

/**
 * @param {string} url
 */
export function redirect(url) {
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.click();
}
