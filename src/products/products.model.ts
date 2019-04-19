/* tslint:disable:no-unsafe-any */
import { Model, model, Schema } from 'mongoose';

import { currencies, currencySymbols, fx } from '../../shared';
import { categorySchema } from '../categories/categories.model';

import { Currency, ProductModel } from './product.interface';

const productSchema: Schema = new Schema({
    category: categorySchema,
    name: { type: String, required: true },
    // Pictures must start with 'http://
    pictures: [{ type: String, match: /^http?s:\/\//i }],
    price: {
        amount: {
            required: true,
            type: Number,
            // Custom setters
            set(v: number): number {
                this.internal.approximatePriceUSD = v / ((fx()[`${this.price.currency}`]) as number || 1);
                return v;
            }
        },
        // Only 3 supported currencies for now
        currency: {
            enum: currencies,
            required: true,
            type: String,
            set(v: Currency): Currency {
                this.internal.approximatePriceUSD = (this.price.amount / (fx()[v] || 1));
                return v;
            }
        }
    },

    internal: {
        approximatePriceUSD: Number
    }
});

/**
 * Human readable string form of price = "$25" rather
 * than "25 USD"
 */

// tslint:disable-next-line:space-before-function-paren
productSchema.methods.showPrice = function (): string {
    return `${currencySymbols[this.price.currency]}${this.price.amount as number}`;
};

export const productModel: Model<ProductModel> = model<ProductModel>('Product', productSchema);
