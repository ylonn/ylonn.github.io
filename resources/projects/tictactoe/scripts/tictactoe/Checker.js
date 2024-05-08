import { Player } from "./Player.js";
import { TicTacToe } from "./TicTacToe.js";

/**
 * @typedef CheckResult
 * @prop {Player} player
 * @prop {boolean} end
 * @prop {Element[]} pcells
 */

export class Checker {
    /** @protected @type {number} */
    _size;

    /**
     * @param {{size: number}} param0
     */
    constructor({ size }) {
        this._size = size;
    }

    get size() {
        return this._size;
    }

    /**
     * @param {TicTacToe} game
     * @param {Player} player
     */
    check(game, player) {
        const { results, matched } = this.results(player);
        if (matched || this.slotsFull()) game.terminate(matched && { ...matched, cells: matched.pcells });

        return { results, matched };
    }

    slotsFull() {
        return document.querySelectorAll(".empty").length == 0;
    }

    /**
     * @param {Player} player
     */
    results(player) {
        const results = [...this.vertical(player), ...this.horizontal(player), ...this.diagonal(player)];
        return { results, matched: results.find((res) => res.end) };
    }

    /**
     * @param {TicTacToe} game
     * @param {Player} player
     */
    winningOrientations(game, player) {
        const { results } = this.results(player);

        return results.filter((result) => {
            const filledCells = result.pcells.filter((v) => v.classList.contains(player.className));
            const opponentFilledCells = result.pcells.filter((v) => v.classList.contains(game.players.find((plr) => plr.className !== player.className)?.className));

            return !opponentFilledCells.length && filledCells.length === game.size - 1;
        });
    }

    /**
     * @param {Player} player
     * @returns {CheckResult[]}
     */
    vertical(player) {
        const cells = document.querySelectorAll(".table-cell");

        return [...Array(this.size)].map((_, i) => {
            /** @type {Element[]} */
            const pcells = [...Array(this.size)].map((_, j) => [...cells].find((cell) => cell.classList.contains(`#${i + this.size * j}`)));

            if (pcells.filter((pcell) => pcell.classList.contains(player.className)).length == this.size) return { player, end: true, pcells };

            return { player, end: false, pcells };
        });
    }

    /**
     * @param {Player} player
     * @returns {CheckResult[]}
     */
    horizontal(player) {
        const cells = document.querySelectorAll(".table-cell");

        return [...Array(this.size)].map((_, i) => {
            /** @type {Element[]} */
            const pcells = [...Array(this.size)].map((_, j) => [...cells].find((cell) => cell.classList.contains(`#${j + this.size * i}`)));

            if (pcells.filter((pcell) => pcell.classList.contains(player.className)).length == this.size) return { player, end: true, pcells };

            return { player, end: false, pcells };
        });
    }

    /**
     * @param {Player} player
     * @returns {CheckResult[]}
     */
    diagonal(player) {
        const cells = document.querySelectorAll(".table-cell");

        /** @type {Element[][]} */
        const pcellsArr = [[...Array(this.size)].map((_, i) => [...cells].find((cell) => cell.classList.contains(`#${i * (this.size + 1)}`))), [...Array(this.size)].map((_, i) => [...cells].find((cell) => cell.classList.contains(`#${(i + 1) * (this.size - 1)}`)))];

        return pcellsArr.map((pcells) => (pcells.filter((cell) => cell.classList.contains(player.className)).length == this.size ? { player, end: true, pcells } : { player, end: false, pcells }));
    }
}
