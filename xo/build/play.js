"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const board_1 = require("./board");
const move_maker_1 = require("./move-maker");
class PlayProgram {
    constructor(board) {
        this.board = board;
        let team = process.argv[2];
        switch (team) {
            case 'x':
            case 'X':
                this.userTeam = board_1.Team.X;
                this.aiTeam = board_1.Team.O;
                this.brain = path.resolve(__dirname, '../', process.argv[3] || 'teamO_brain.json');
                break;
            case 'o':
            case 'O':
                this.userTeam = board_1.Team.O;
                this.aiTeam = board_1.Team.X;
                this.brain = path.resolve(__dirname, '../', process.argv[3] || 'teamX_brain.json');
                break;
            default:
                process.stdout.write('Specify team, X or O\n');
                process.exit();
        }
        this.gameEngine = new move_maker_1.MoveMaker(this.board, this.aiTeam, this.brain);
        if (this.aiTeam == board_1.Team.X) {
            this.gameEngine.makeMove();
        }
        this.tick();
        this.printPrompt();
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (txt) => this.onMoveReceived(txt));
    }
    tick() {
        this.board.print();
        const winner = this.board.determineWinner();
        if (winner !== board_1.Team.Empty) {
            process.stdout.write(`Team ${winner} Wins! \n`);
            this.gameEngine.learnThings(winner);
            this.gameEngine.saveBrain();
            process.exit();
        }
    }
    onMoveReceived(txt) {
        const data = txt.split(',');
        const col = Number(data[0]);
        const row = Number(data[1]);
        const space = this.board.squares[row * 3 + col];
        if (space === board_1.Team.Empty) {
            this.board.set(row, col, this.userTeam);
            this.tick();
            this.gameEngine.makeMove();
            this.tick();
            this.printPrompt();
        }
        else {
            process.stdout.write(`Space ${txt} is already taken by ${space}. Please try again \n`);
            this.printPrompt();
        }
    }
    printPrompt() {
        process.stdout.write(`Team ${this.userTeam}: `);
    }
}
exports.PlayProgram = PlayProgram;
new PlayProgram(new board_1.Board());
//# sourceMappingURL=play.js.map