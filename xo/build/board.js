"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Team;
(function (Team) {
    Team["X"] = "X";
    Team["O"] = "O";
    Team["Empty"] = ".";
    Team["CAT"] = "CAT";
})(Team = exports.Team || (exports.Team = {}));
class Board {
    constructor() {
        this.spaces = new Array(9).fill(Team.Empty);
    }
    get squares() {
        return [...this.spaces];
    }
    set(row, col, team) {
        const i = row * 3 + col;
        this.spaces[i] = team;
    }
    setByIndex(index, team) {
        this.spaces[index] = team;
    }
    key() {
        return this.spaces.join('');
    }
    print() {
        const board = this.spaces.reduce((b, team, i) => {
            if (!(i % 3)) {
                b += '\n';
            }
            b += team + ' ';
            return b;
        }, '');
        console.log(board + '\n');
    }
    determineWinner() {
        const squares = this.squares;
        if (this.checkBoard(0, 1, 2)) {
            // row 1
            return squares[0];
        }
        else if (this.checkBoard(3, 4, 5)) {
            // row 2
            return squares[3];
        }
        else if (this.checkBoard(6, 7, 8)) {
            // row3
            return squares[6];
        }
        else if (this.checkBoard(0, 3, 6)) {
            // col 1
            return squares[0];
        }
        else if (this.checkBoard(1, 4, 7)) {
            // col 2
            return squares[1];
        }
        else if (this.checkBoard(2, 5, 8)) {
            // col 3
            return squares[2];
        }
        else if (this.checkBoard(0, 4, 8)) {
            // Diagonal top-left > bottom-right
            return squares[0];
        }
        else if (this.checkBoard(2, 4, 6)) {
            // Diagonal top-right > bottom-left
            return squares[2];
        }
        else if (squares.every(square => square !== Team.Empty)) {
            return Team.CAT;
        }
        return Team.Empty;
    }
    checkBoard(first, second, third) {
        const squares = this.squares;
        return (squares[first] !== Team.Empty &&
            squares[second] !== Team.Empty &&
            squares[third] !== Team.Empty &&
            squares[first] === squares[second] &&
            squares[second] === squares[third]);
    }
}
exports.Board = Board;
//# sourceMappingURL=board.js.map