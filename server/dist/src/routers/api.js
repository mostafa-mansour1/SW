"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const people_api_1 = __importDefault(require("./swapi/people.api"));
// Init
const apiRouter = (0, express_1.Router)();
// Add api routes
apiRouter.use('/swapi', people_api_1.default);
// Export default
exports.default = apiRouter;
