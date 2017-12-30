import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

let board = new Board();
let engineX = new MoveMaker(board, Team.X);
let engineO = new MoveMaker(board, Team.O);

let xWins = 0;
let oWins = 0;
let catWins = 0;

const iterations = process.argv.length < 3 ? 50000 : Number(process.argv[2]);

for (let i = 0; i < iterations; i++) {
  let winner = train();

  engineX.learnThings(winner);
  engineO.learnThings(winner);

  if (i % 10000 === 0) {
    console.log(xWins + '-' + oWins + '-' + catWins);

    board.print();
  }

  board = new Board();
  engineX.reset(board);
  engineO.reset(board);
}

engineX.saveBrain();
engineO.saveBrain();

console.log(
  '=============================\n' + xWins + '-' + oWins + '-' + catWins
);

function train() {
  let team: Team = Team.O;

  while (engineX.chooseWinner() === Team.E) {
    team = team === Team.O ? Team.X : Team.O;

    switch (team) {
      case Team.X:
        engineX.makeMove();
        break;

      case Team.O:
        engineO.makeMove();
        break;
    }
  }

  switch (engineX.chooseWinner()) {
    case Team.X:
      xWins += 1;
      break;
    case Team.O:
      oWins += 1;
      break;
    case Team.CAT:
      catWins += 1;
      break;
  }

  return engineX.chooseWinner();
}
