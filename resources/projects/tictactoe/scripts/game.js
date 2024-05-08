import { Bot, Player, TicTacToe } from "./tictactoe/index.js";

const players = [new Player("You", "X"), new Bot("Bot", "O")];
// const players = [new Player("1", "X"), new Player("2", "O")];
const tictactoe = new TicTacToe({ size: 3, players });

function updateData() {
    /** @type {[HTMLInputElement, HTMLInputElement, HTMLInputElement]} */
    const [isPlayerCheckBox, placeDelayInput, accuracyInput] = [document.querySelector("input#is-player"), document.querySelector("input#place-delay"), document.querySelector("input#accuracy")];

    if (isPlayerCheckBox.checked) return void (tictactoe.players = [players[0], new Player("Player 2", "O")]);
    tictactoe.players = players;

    /** @type {Bot} */
    const bot = players.find((player) => player.isBot());

    bot.placeDelay = Number(placeDelayInput.value) || 1;
    bot.accuracy = Number(accuracyInput.value) || 100;
}

/** @type {HTMLDivElement } */
const endScreen = document.querySelector("div.end-screen");

endScreen.addEventListener("click", () => {
    updateData();
});
