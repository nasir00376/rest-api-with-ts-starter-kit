import * as express from 'express';

import { ErrorResult } from './errors';

export interface KeyValuePair {
    // tslint:disable-next-line:no-any
    [key: string]: any;
}

export interface CurrencySymbols {
    EUR: string;
    GBP: string;
    USD: string;
}

export interface Fx {
    EUR: number;
    GBP: number;
    USD: number;
}

export interface ErrorResponseBody {
    error: ErrorResult;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}
export type Currencies = ['USD', 'EUR', 'GBP'];
export type App = express.Application;
export type Request = express.Request;
export type Response = express.Response;
export type ApiHandler = (req: Request, res: Response) => Promise<void>;

export type ID = string;

export interface Where {
    // tslint:disable-next-line:no-any
    [key: string]: any;
}

export interface Filter {
    /** Where clause */
    where?: Where;
}