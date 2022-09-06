"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const errors_1 = require("./src/helper/errors");
const api_1 = __importDefault(require("./src/routers/api"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const general_functions_1 = require("./src/functions/general.functions");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//disable unauthorized websites to use the service
app.use((0, cors_1.default)({
    origin: (_, callback) => {
        // console.log("asddasd")
        // const allowedCors = process.env.CORS?.split(" ") || [];
        // //enable back-end to back-end calls
        // allowedCors.push("")
        // allowedCors.push("localhost")
        // console.log()
        // return allowedCors.includes(origin || "")
        //     ? callback(null, true)
        //     : callback(new Error('CORS Error'))
        return callback(null, true);
    },
    credentials: true
}));
// APIs routers
app.use('/api', api_1.default);
// Error handling
app.use((err, _, res, _next) => {
    general_functions_1.log.info("err", err);
    const status = (err instanceof errors_1.CustomError ? err.HttpStatus : http_status_codes_1.default.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});
//server the website from build folder
const staticDir = path_1.default.join(__dirname, 'build');
app.use(express_1.default.static(staticDir));
app.get("/manifest.json", (_, res) => {
    res.sendFile(__dirname + "/build/manifest.json");
});
app.all('*', function (_, res) {
    res.redirect('/');
});
exports.default = app;
