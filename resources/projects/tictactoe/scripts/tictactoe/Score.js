export class Score {
    _value = 0;

    constructor(starting = 0) {
        this._value = starting;
    }

    get value() {
        return this._value;
    }

    add(score = 1) {
        this._value += score;
    }

    remove(score = 1) {
        this._value -= score;
    }
}
