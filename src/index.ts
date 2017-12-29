import { inspect } from 'util';

import { Board, Team } from './board';

// import { GameStateGenerator } from './generate-game-states';

import { Program } from './program';

// const generator = new GameStateGenerator();

// generator.generate();

const program = new Program(new Board(), Team.X);
