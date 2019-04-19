// Export const dbURL: string = 'mongodb://localhost/retail';
export const dbURL: string = '';

const defaultPort: number = 5000;
export const PORT: number | string = process.env.PORT || defaultPort;
