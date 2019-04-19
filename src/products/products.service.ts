import * as Debug from 'debug';
import { omit } from 'lodash';

import { shallowCopy } from '../../shared';
import { Filter, ID, Where, } from '../../shared/common.interface';
import { ErrorCode } from '../../shared/error-codes';
import { InternalServerErrorResult, NotFoundResult } from '../../shared/errors';
import { Category } from '../categories/categories.interface';
import { CategoriesService } from '../categories/categories.service';

import { Product, ProductModel, } from './product.interface';
import { productModel } from './products.model';

const debug: Debug.IDebugger = Debug('retail:service:product');

export class ProductsService {
    public constructor(private readonly categoryService: CategoriesService) { }

    // Create a new instance of a product
    public async create(_product: Product): Promise<Product> {
        const category: Category = await this.categoryService.getById(_product.categoryId);
        const product: ProductModel = await productModel.create(this.formatData(_product, category));
        return this.formatProduct((product));
    }

    // List categories by filter
    public readonly get = async (filter?: Filter): Promise<Product[]> => {
        try {
            const where: Where = filter && filter.where || {};
            debug('filter', where);
            const products: ProductModel[] = await productModel.find(where).sort({ _id: 1 });


            return this.fromatResponse((products));
        } catch (error) {
            throw new InternalServerErrorResult(ErrorCode.InternalServerError, error.message || 'Something went wrong');
        }
    }

    // Get Product By Id
    public readonly getById = async (_id: ID): Promise<Product> => {
        try {
            const product: ProductModel | null = await productModel.findOne({ _id });

            if (!product) {
                throw new NotFoundResult(ErrorCode.InvalidId, 'Product not found.');
            }

            debug('Product fetched & formatting...');

            return this.formatProduct((product));
        } catch (error) {
            if (error instanceof NotFoundResult) { throw error; }

            throw new InternalServerErrorResult(ErrorCode.InternalServerError, 'Something went wrong.');
        }
    }

    // Format Product that persits product model
    private readonly formatData = (product: Product, category: Category): Product => {
        delete product.category;
        category._id = category.name;

        return {
            category,
            ...product
        };
    }

    private readonly formatProduct = (product: ProductModel): Product => ({
        displayPrice: product.showPrice(),
        ...omit(shallowCopy(product), ['__v'])
    })

    // Format response
    private readonly fromatResponse = (data: ProductModel[]): Product[] =>
        data.map((product: ProductModel) => this.formatProduct(product))
}
