import { Currencies } from './common.interface';

export const currencies: Currencies = ['USD', 'EUR', 'GBP'];
// tslint:disable-next-line:no-any
export const currencySymbols: any = {
    EUR: '€',
    GBP: '£',
    USD: '$',
};

// tslint:disable-next-line:no-any
export function fx(): any {
    return {
        EUR: 1.1,
        GBP: 1.5,
        USD: 1,
    };
}

export function shallowCopy<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}
