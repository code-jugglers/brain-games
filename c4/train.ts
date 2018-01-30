import { Team } from '@games/shared';

import { C4Board } from './board';

let board = new C4Board();

board.set(0, 0, Team.X);
board.set(0, 1, Team.B);
board.set(0, 2, Team.X);
board.set(0, 3, Team.B);

board.print();
