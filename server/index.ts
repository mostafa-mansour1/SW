import app from './app';
import { log } from './src/functions/general.functions';

const port = process.env.PORT || 1000;


// Start server
app.listen(port, () => {
    log.info(`start at  http://localhost:${port}, copy the static website (react project) into dist/build`);
});