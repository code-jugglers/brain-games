"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("./board");
const game_state_1 = require("./game-state");
class MoveHistory {
    constructor(squarePick, team, key) {
        this.squarePick = squarePick;
        this.team = team;
        this.key = key;
    }
}
exports.MoveHistory = MoveHistory;
class MoveMaker {
    constructor(board, team, brainConfig) {
        this.board = board;
        this.team = team;
        this.brainConfig = brainConfig;
        this.gameHistory = [];
        this.brain = new game_state_1.GameStates(this.brainConfig);
    }
    reset(board) {
        this.board = board;
        this.gameHistory = [];
    }
    determineMove() {
        // based on probability, select the best available move for the given team
        const memory = this.brain.gameStates.get(this.board.key());
        const availMoves = memory ? memory.moves : this.getAvailableMoves();
        // If the brain hasn't seen this board state before, save it
        if (!memory) {
            this.brain.gameStates.set(this.board.key(), new game_state_1.GameState(availMoves));
        }
        return this.pickRandomPercentage(availMoves);
    }
    pickRandomPercentage(counts) {
        const total = counts.reduce((sum, move) => sum + move.count, 0);
        let random = Math.floor(Math.random() * total) + 1; // Random inclusive between 1 and total
        let move;
        for (let i = 0; i < counts.length; i++) {
            move = counts[i];
            if (move.count == 0) {
                continue;
            }
            if (random <= move.count) {
                return move;
            }
            random = random - move.count;
        }
        return null;
    }
    makeMove() {
        let move = this.determineMove();
        this.gameHistory.push(new MoveHistory(move, this.team, this.board.key()));
        this.board.setByIndex(move.index, this.team);
    }
    learnThings(winner) {
        for (let move of this.gameHistory) {
            let moves = this.brain.gameStates.get(move.key).moves;
            moves.find(brainMove => {
                return brainMove.index === move.squarePick.index;
            }).count +=
                winner === this.team ? 3 : winner === board_1.Team.CAT ? 0 : -1;
            if (moves.every(move => move.count === 0)) {
                moves.forEach((move, index) => {
                    move.count = 3;
                });
            }
        }
    }
    saveBrain() {
        this.brain.save();
    }
    getAvailableMoves() {
        const length = this.board.squares.length;
        const moves = [];
        for (let i = 0; i < length; i++) {
            if (this.board.squares[i] === board_1.Team.Empty) {
                moves.push(new game_state_1.Move(i, 3));
            }
        }
        return moves;
    }
}
exports.MoveMaker = MoveMaker;
//# sourceMappingURL=move-maker.js.map