import { Board, Team } from './board';

const board = new Board();

board.set(0, 0, Team.X);
board.set(0, 1, Team.O);
board.set(0, 2, Team.O);
board.set(2, 1, Team.O);

board.print();
