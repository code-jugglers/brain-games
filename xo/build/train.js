"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const board_1 = require("./board");
const move_maker_1 = require("./move-maker");
let board = new board_1.Board();
let engineX = new move_maker_1.MoveMaker(board, board_1.Team.X, (this.brain = path.resolve(__dirname, '../', process.argv[3] || 'teamX_brain.json')));
let engineO = new move_maker_1.MoveMaker(board, board_1.Team.O, (this.brain = path.resolve(__dirname, '../', process.argv[3] || 'teamO_brain.json')));
let xWins = 0;
let oWins = 0;
let catWins = 0;
const iterations = process.argv.length < 3 ? 50000 : Number(process.argv[2]);
for (let i = 0; i < iterations; i++) {
    let winner = train();
    engineX.learnThings(winner);
    engineO.learnThings(winner);
    if (i % 10000 === 0) {
        console.log(`=========== Game ${i + 1} ==============`);
        board.print();
        console.log('X:    ', xWins);
        console.log('O:    ', oWins);
        console.log('DRAW: ', catWins);
        console.log(' ');
    }
    else if (i === iterations - 1) {
        console.log(' ');
        console.log('=========== FINAL ==============');
        board.print();
        console.log('X:    ', xWins);
        console.log('O:    ', oWins);
        console.log('DRAW: ', catWins);
    }
    board = new board_1.Board();
    engineX.reset(board);
    engineO.reset(board);
}
engineX.saveBrain();
engineO.saveBrain();
function train() {
    let team = board_1.Team.O;
    while (board.determineWinner() === board_1.Team.Empty) {
        team = team === board_1.Team.O ? board_1.Team.X : board_1.Team.O;
        switch (team) {
            case board_1.Team.X:
                engineX.makeMove();
                break;
            case board_1.Team.O:
                engineO.makeMove();
                break;
        }
    }
    const winner = board.determineWinner();
    switch (winner) {
        case board_1.Team.X:
            xWins += 1;
            break;
        case board_1.Team.O:
            oWins += 1;
            break;
        case board_1.Team.CAT:
            catWins += 1;
            break;
    }
    return winner;
}
//# sourceMappingURL=train.js.map