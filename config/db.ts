import * as Debug from 'debug';


const debug: Debug.IDebugger = Debug('retail:db');

export async function connectDB(): Promise<void> {
    debug('Database connected successfully');
}
