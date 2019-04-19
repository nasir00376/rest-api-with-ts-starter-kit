// Export const dbURL: string = 'mongodb://localhost/retail';
export const dbURL: string = 'mongodb://nasir:youngstar786@mongodb-1029-0.cloudclusters.net/retail?authSource=admin';

const defaultPort: number = 5000;
export const PORT: number | string = process.env.PORT || defaultPort;
