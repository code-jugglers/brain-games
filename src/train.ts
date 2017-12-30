import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

const team: Team = Team.X;

while (this.engineX.chooseWinner() === Team.E) {
  switch (this.team) {
    case Team.X:
      this.engineX.makeMove(Team.X);

    case Team.O:
      this.engineO.makeMove(Team.O);
  }
}

console.log(`Team: ${this.team} Wins!`);
