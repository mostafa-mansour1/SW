"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const general_functions_1 = require("./src/functions/general.functions");
const port = process.env.PORT || 1000;
// Start server
app_1.default.listen(port, () => {
    general_functions_1.log.info(`start at  http://localhost:${port}, copy the static website (react project) into dist/build`);
});
