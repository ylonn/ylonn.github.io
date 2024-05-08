import { Bot } from "./Bot.js";
import { Checker } from "./Checker.js";
import { Player } from "./Player.js";

export class TicTacToe {
    /** @protected @type {number} */
    _size;

    /** @protected @type {number} */
    _slots;

    /** @protected @type {Player[]} */
    _players;

    /** @protected @type {Player} */
    _turn;

    /** @protected @type {Checker} */
    _checker;

    /** @protected @type {boolean} */
    _gameOver;

    constructor({ size = 3, players = [new Player("player", "X"), new Bot("the bot", "O")] } = {}) {
        this._size = size;
        this._slots = size ** 2;

        this._players = players.map((plr) => (plr.isBot() ? void plr.setGame(this) || plr : plr));
        this._turn = this._players[0];
        this._checker = new Checker({ size });

        this.start();
    }

    get size() {
        return this._size;
    }

    get checker() {
        return this._checker;
    }

    set players(players) {
        this._players = players;
    }

    get players() {
        return this._players;
    }

    start() {
        document.addEventListener("click", (ev) => this._turn.isBot() || this._turn.placeMark(this, ev.target));
        document.addEventListener("mouseover", (ev) => this.cellHover(ev.target));

        this._gameOver = false;
        this._turn = this.randomTurn();
        this.createTurnLabels();
        this.createTable();
    }

    restart() {
        if (!this._gameOver) return;

        [...document.querySelectorAll(".table-row")].map((row) => document.querySelector(".table").removeChild(row));
        [...document.querySelectorAll(".turn-label")].map((label) => document.querySelector(".turn-labels").removeChild(label));

        this.start();
    }

    get isGameOver() {
        return this._gameOver;
    }

    /**
     * @param {{player: Player | Bot, cells: HTMLElement[]} | undefined} result
     */
    terminate(result) {
        // Render end screen
        this._gameOver = true;
        this.renderEndScreen(result);

        // Add score to the winner
        result?.player.score.add();
        result?.cells.forEach((cell) => (cell.style.backgroundColor = "red"));
    }

    /**
     * @param {{player: Player | Bot, cells: HTMLElement[]} | undefined} result
     */
    renderEndScreen(result) {
        /** @type {HTMLDivElement} */
        const endScreen = document.querySelector(".end-screen");

        endScreen.textContent = result ? `\nWinner: ${result.player.name}` : "Draw";
        endScreen.classList.add("display");
        // endScreen.hidden = !this._gameOver;

        endScreen.addEventListener("click", () => {
            endScreen.classList.remove("display");

            this.restart();
        });
    }

    randomTurn() {
        const currentTurn = this._players[parseInt(Math.random() * this._players.length)];
        if (currentTurn.isBot()) currentTurn.placeMark();

        return currentTurn;
    }

    switchTurn() {
        this._turn = this._players[this._players.indexOf(this._turn) < 1 ? 1 : 0];

        const { matched } = this._checker.check(this, this._turn);
        if (matched) return;

        this.indicateTurn();
        if (this._turn.isBot()) this._turn.placeMark();
    }

    indicateTurn() {
        for (const pindex in this._players) {
            const label = document.querySelector(`.player${Number(pindex) + 1}-turn`);
            label.classList.remove("turn-current");

            if (this._turn == this._players[pindex]) label.classList.add("turn-current");
        }
    }

    createTurnLabels() {
        const turnLabel = document.querySelector(".turn-labels");

        for (const pindex in this._players) {
            const label = document.createElement("label");
            label.classList.add("turn-label", `player${Number(pindex) + 1}-turn`);
            label.textContent = `${this._players[pindex].name.toUpperCase()}: ${this._players[pindex].score.value}`;

            turnLabel.appendChild(label);
        }

        this.indicateTurn();
    }

    /**
     * @param {Number} size
     */
    createTable(size = this._size) {
        const table = document.querySelector(".table");

        for (let _row = 0; _row < size; _row++) {
            const row = document.createElement("div");
            row.classList.add("table-row");

            for (let _cell = 0; _cell < size; _cell++) {
                const cell = document.createElement("div");

                cell.classList.add("table-cell", `#${_cell + _row * size}`, "empty");
                row.appendChild(cell);
            }

            table.appendChild(row);
        }
    }

    /**
     *
     * @param {Element} cell
     */
    cellHover(cell, player = this._turn) {
        if (this._turn.isBot() || this._gameOver) return;

        [...document.querySelectorAll(".hovered")].map((cell) => cell.classList.remove("hovered", player.mark));
        if (cell.classList.contains("table-cell") && cell.classList.contains("empty")) cell.classList.add("hovered", player.mark);
    }
}
