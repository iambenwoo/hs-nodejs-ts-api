import express from 'express';
import morgan from 'morgan';
import moment from 'moment-timezone';
import winston from './config/winston';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import productRoute from './routes/productRoute';

const logger = winston(module);
const port = 8081;
const result = dotenv.config();
const timezone = 'Asia/Hong_Kong';

if (process.env.NODE_ENV === 'dev') {
    logger.log('info', result.parsed);
}

morgan.token('date', () => {
    return moment().tz(timezone).format();
});
morgan.format('myformat', '[:date[Asia/Hong_Kong]] ":method :url" :status :res[content-length] - :response-time ms');

const app = express();

app.use(morgan('myformat'));
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

app.use('/api/v1/product', productRoute);

async function main() {
    app.listen(port, () => {
        logger.log('info', 'Listening on port ' + port + '...');
    });
}

main();
