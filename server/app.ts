import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import StatusCodes from 'http-status-codes';
import { CustomError } from './src/helper/errors';
import apiRouter from './src/routers/api';
import dotenv from 'dotenv';
import path from 'path';
import { log } from './src/functions/general.functions';

dotenv.config();

const app: Express = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//disable unauthorized websites to use the service
app.use(cors({
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
    }
    , credentials: true
}));



// APIs routers
app.use('/api', apiRouter);



// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, _next: NextFunction) => {
    log.info("err", err)
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});


//server the website from build folder
const staticDir = path.join(__dirname, 'build');
app.use(express.static(staticDir));

app.get("/manifest.json", (_, res) => {
    res.sendFile(__dirname + "/build/manifest.json");
});


app.all('*', function (_, res) {
    res.redirect('/');
});

export default app;