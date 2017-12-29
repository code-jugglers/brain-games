import { inspect } from 'util';

import { Board, Team } from './board';

import { Program } from './program';

const program = new Program(new Board(), Team.X);
