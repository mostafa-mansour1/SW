"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
exports.log = {
    info: (...message) => console.info(...message),
    err: (...message) => console.error(...message),
    log: (...message) => console.log(...message),
    wrn: (...message) => console.warn(...message),
    grid: (...message) => console.table(...message)
};
