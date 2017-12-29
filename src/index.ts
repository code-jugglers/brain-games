import { Board, Team } from './board';

import { Program } from './program';

// import { GameStateGenerator } from './generate-game-states';

// const generator = new GameStateGenerator();
// generator.generate();

const program = new Program(new Board(), Team.X);
