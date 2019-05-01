// Export const dbURL: string = 'mongodb://localhost/retail';
export const dbURL: string = '';
export const env: string = process.env.NODE_ENV || 'development';

const defaultPort: number = 5000;
export const PORT: number | string = process.env.PORT || defaultPort;
