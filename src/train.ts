import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

let board: Board;
let engineX: MoveMaker;
let engineO: MoveMaker;

for (let i = 0; i < 1000; i++) {
  board = new Board();
  engineX = new MoveMaker(board, Team.X);
  engineO = new MoveMaker(board, Team.O);

  train();
}

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

    board.print();
  }

  console.log(`Team: ${engineX.chooseWinner()} Wins!`);
}
