import * as Debug from 'debug';
import { connect } from 'mongoose';

import { dbURL } from './config';

const debug: Debug.IDebugger = Debug('retail:db');

export async function connectDB(): Promise<void> {
    await connect(dbURL, { useNewUrlParser: true });
    debug('Database connected successfully');
}
