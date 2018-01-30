"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const brain_map_1 = require("./brain-map");
class Move {
    constructor(index, count) {
        this.index = index;
        this.count = count;
    }
}
exports.Move = Move;
class GameState {
    constructor(moves) {
        this.moves = moves;
    }
}
exports.GameState = GameState;
class GameStates {
    constructor(savedFile = 'game-states.json') {
        this.savedFile = savedFile;
        this.gameStates = new brain_map_1.BrainMap(fs_extra_1.readJsonSync(this.savedFile));
    }
    save() {
        fs_extra_1.writeJsonSync(this.savedFile, this.gameStates.state);
    }
}
exports.GameStates = GameStates;
//# sourceMappingURL=game-state.js.map