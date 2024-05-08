import { Bot } from "./Bot.js";
import { Score } from "./Score.js";
import { TicTacToe } from "./TicTacToe.js";

export class Player {
    /** @protected @type {string} */
    _name;

    /** @protected @type {string} */
    _className;

    /** @protected @type {string} */
    _mark;

    /** @protected @type {Score} */
    _score = new Score();

    /**
     * @param {string | undefined} name
     * @param {PlaceMark} mark
     */
    constructor(name = "you", mark) {
        this._name = name;
        this._className = name.replace(/\s+/g, "_");
        this._mark = mark;
    }

    get name() {
        return this._name;
    }

    get className() {
        return this._className;
    }

    get mark() {
        return this._mark;
    }

    get score() {
        return this._score;
    }

    /**
     * @returns {this is Bot}
     */
    isBot() {
        return this instanceof Bot;
    }

    /**
     * @param {TicTacToe} game
     * @param {Element} cell
     */
    placeMark(game, cell) {
        if (game.isGameOver || !cell?.classList.contains("empty")) return;

        cell.classList.remove("empty", "hovered");
        cell.classList.add(this._className, this._mark);

        const { matched } = game.checker.check(game, this);
        if (!matched) game.switchTurn();
    }
}
