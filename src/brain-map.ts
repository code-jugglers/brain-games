import { GameState } from './game-state';

export class BrainMap {
  state: GameState[][] = new Array(20000);
  keys: { [key: string]: number } = {};
  nextEmpty = 0;

  set(key: string, state: GameState[]) {
    if (key in this.keys) {
      this.state[this.keys[key]] = state;
    } else {
      this.state[this.nextEmpty] = state;

      this.keys[key] = this.nextEmpty;

      this.nextEmpty++;
    }
  }

  get(key: string) {
    return this.state[this.keys[key]];
  }
}

const brain = new BrainMap();

brain.set('...XXX...', []);

brain.set('.........', []);

brain.set('...OOO...', []);

brain.set('...XXX...', []);

console.log(brain);
