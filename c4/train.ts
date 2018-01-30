import { Board, Team } from './board';

let board = new Board();

board.set(0, 0, Team.X);
board.set(0, 1, Team.B);
board.set(0, 2, Team.X);
board.set(0, 3, Team.B);

board.print();
