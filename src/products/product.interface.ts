import { Document } from 'mongoose';

import { Category } from '../categories/categories.interface';

export type Picture = string;
export type Currency = 'USD' | 'GBP' | 'EUR';

export interface Price {
    amount: number;
    currency: Currency;
}

export interface Internal {
    approximatePriceUSD: number;
}

export interface Product {
    /** From which category this product belongs */
    category?: Category;

    /** Unique categoryId */
    categoryId: string;

    /** Human readable price */
    // DisplayPrice?: (() => string);
    displayPrice?: string;

    /** method that return price in approximate USD  */
    internal?: Internal;

    /** Name of the product */
    name: string;

    /** List of all pictures */
    pictures: Picture[];

    /** Pirce of product with currency */
    price: Price;
}

export interface ProductModel extends Product, Document {
    _id: string;
    showPrice: (() => string);
}
