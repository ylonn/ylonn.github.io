import { Player } from "./Player.js";
import { Score } from "./Score.js";
import { TicTacToe } from "./TicTacToe.js";

export class Bot extends Player {
    /** @protected @type {TicTacToe} */
    _game;

    /** @protected @type {number} */
    _accuracy;

    /** @protected @type {number} */
    _placeDelay;

    /** @protected @type {Score} */
    _score = new Score();

    /**
     * @param {string} name
     * @param {PlaceMark} mark
     * @param {number} placeDelay
     */
    constructor(name = "bot", mark, accuracy = 100, placeDelay = 1) {
        super(name, mark);

        this._accuracy = accuracy;
        this._placeDelay = placeDelay * 1000;
    }

    get accuracy() {
        return this._accuracy;
    }

    set accuracy(accuracy = 100) {
        this._accuracy = accuracy;
    }

    get placeDelay() {
        return this._placeDelay;
    }

    set placeDelay(delay = 1) {
        this._placeDelay = delay * 1000;
    }

    /**
     * @param {TicTacToe} game
     */
    setGame(game) {
        this._game = game;
    }

    /**
     * @param {number} accuracy
     */
    placeMark(accuracy = this._accuracy) {
        setTimeout(() => {
            const opponentWinningOrientations = this._game.checker.winningOrientations(
                this._game,
                this._game.players.find((plr) => plr.className !== this._className)
            );

            opponentWinningOrientations.length ? this.placeDefenseMark(accuracy) : this.placeOffenseMark(accuracy);
        }, this._placeDelay);
    }

    /**
     * @param {number} accuracy
     */
    placeOffenseMark(accuracy = this._accuracy) {
        const chance = Math.random() * 100;
        const cells = [...document.querySelectorAll(".table-cell.empty")];

        if (chance <= accuracy) {
            const winningOrientations = this._game.checker.winningOrientations(this._game, this);
            if (winningOrientations.length)
                return void super.placeMark(
                    this._game,
                    winningOrientations[Math.floor(Math.random() * winningOrientations.length)].pcells.find((pcell) => pcell.classList.contains("empty"))
                );

            const { results } = this._game.checker.check(this._game, this);

            /** @type {{emptyCells: number, botFilledCells: number, result: import("./Checker.js").CheckResult}} */
            const data = { emptyCells: Infinity, botFilledCells: 0, result: void 0 };

            for (const result of results) {
                const botFilledCells = result.pcells.filter((v) => v.classList.contains(this.className));
                const emptyCells = result.pcells.filter((v) => v.classList.contains("empty"));

                if (emptyCells.length + botFilledCells.length !== this._game.size || botFilledCells.length <= data.botFilledCells) continue;

                data.emptyCells = emptyCells.length;
                data.botFilledCells = botFilledCells.length;
                data.result = result;
            }

            const chosenCell = data.result?.pcells.find((cell) => cell.classList.contains("empty")) ?? cells[Math.floor(Math.random() * cells.length)];
            // if (!chosenCell) return this.placeDefenseMark(accuracy);

            super.placeMark(this._game, cells[cells.indexOf(chosenCell)]);
        } else super.placeMark(this._game, cells[Math.floor(Math.random() * cells.length)]);
    }

    /**
     * @param {number} accuracy
     */
    placeDefenseMark(accuracy = this._accuracy) {
        const chance = Math.random() * 100;
        const cells = [...document.querySelectorAll(".table-cell.empty")];

        if (chance <= accuracy) {
            const { results } = this._game.checker.check(this._game, this);

            /** @type {{emptyCells: number, opponentFilledCells: number, result: import("./Checker.js").CheckResult}} */
            const data = { emptyCells: Infinity, opponentFilledCells: 0, result: void 0 };

            for (const result of results) {
                const opponentFilledCells = result.pcells.filter((v) => v.classList.contains(this._game.players.find((player) => player.className !== this.className)?.className));
                const emptyCells = result.pcells.filter((v) => v.classList.contains("empty"));

                if (emptyCells.length + opponentFilledCells.length !== this._game.size || opponentFilledCells.length <= data.opponentFilledCells) continue;

                data.emptyCells = emptyCells.length;
                data.opponentFilledCells = opponentFilledCells.length;
                data.result = result;
            }

            const chosenCell = data.result?.pcells.find((cell) => cell.classList.contains("empty")) ?? cells[Math.floor(Math.random() * cells.length)];
            super.placeMark(this._game, cells[cells.indexOf(chosenCell)]);
        } else super.placeMark(this._game, cells[Math.floor(Math.random() * cells.length)]);
    }
}
