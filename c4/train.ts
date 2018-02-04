import { Board, Team } from './board';

const board = new Board();

board.set(0, 5, Team.O);
board.set(1, 4, Team.O);
board.set(2, 3, Team.O);
board.set(3, 2, Team.O);

board.print();

const winner = board.determineWinner();

console.log(winner);
