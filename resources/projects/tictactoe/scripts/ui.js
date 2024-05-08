/** @type {HTMLInputElement} */
const isPlayerCheckbox = document.querySelector("input#is-player");

/** @type {HTMLDivElement} */
const botSettings = document.querySelector("div#bot-settings");

isPlayerCheckbox.addEventListener("click", () => {
    botSettings.hidden = isPlayerCheckbox.checked;
});
