import * as Debug from 'debug';

import { sequelize } from './sequelize';

const debug: Debug.IDebugger = Debug('starter-kit:db');

export async function connectDB(): Promise<void> {
    await sequelize.sync({ force: false });
    debug('Database connected successfully');
}
