import { Board, Team } from './board';

const board = new Board();

board.set(0, 0, Team.O);
board.set(1, 1, Team.O);
board.set(2, 2, Team.O);
board.set(3, 3, Team.O);

board.print();

const winner = board.determineWinner();

console.log(winner);
