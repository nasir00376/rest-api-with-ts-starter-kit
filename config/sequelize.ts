import * as Debug from 'debug';
import * as path from 'path';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { env } from './config';
import * as _config from './database.json';

const debug: Debug.IDebugger = Debug('starter-kit:sequelize');

debug('env', env, path.join(__dirname, '../**/*.model.ts'));

const { host, port, database, dialect, username } = _config[env];

export const sequelize: Sequelize = new Sequelize({
    database,
    dialect,
    host,
    // Models: [path.resolve(__dirname, '../', 'src', '/**/*.model.ts')],
    models: [path.join(__dirname, '../**/*.model.ts')],

    operatorsAliases: Op,
    port,
    storage: ':memory:',
    username
});
