"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrainMap {
    constructor(state = {}) {
        this.state = state;
    }
    set(key, state) {
        this.state[key] = state;
    }
    get(key) {
        return this.state[key];
    }
    createHash(key) {
        let hash = 5381;
        let i = key.length;
        while (i) {
            hash = (hash * 33) ^ key.charCodeAt(--i);
        }
        return (hash >>> 0) % 20000;
    }
}
exports.BrainMap = BrainMap;
//# sourceMappingURL=brain-map.js.map