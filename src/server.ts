import * as bodyParser from 'body-parser';
import * as Debug from 'debug';
import * as express from 'express';

import { connectDB, PORT } from '../config';

import { routes } from './routes';

const debug: Debug.IDebugger = Debug('retail:app');

const app: express.Application = express();
// Database connection
connectDB()
    .catch((error: Error) => debug('Error while db connection', error.message));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Use routes as middlewares
routes(app);

app.listen(PORT, () => debug(`Server is listening on ${PORT}`));
