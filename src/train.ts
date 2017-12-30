import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

let board = new Board();
let engineX = new MoveMaker(board, Team.X);
let engineO = new MoveMaker(board, Team.O);

let xWins = 0;
let oWins = 0;
let catWins = 0;

for (let i = 0; i < 1000; i++) {
  // console.log(xWins + '-' + oWins + '-' + catWins);
  let winner = train();
  engineX.learnThings(winner);
  engineO.learnThings(winner);

  board = new Board();
  engineX.reset(board);
  engineO.reset(board);

  if (i % 10000 === 0) {
    console.log(xWins + '-' + oWins + '-' + catWins);
  }
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
