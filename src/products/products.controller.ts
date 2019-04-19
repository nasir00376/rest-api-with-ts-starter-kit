import * as Debug from 'debug';

import { ApiHandler, Filter, Request, Response } from '../../shared/common.interface';
import { ErrorCode } from '../../shared/error-codes';
import { BadRequestResult, InternalServerErrorResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';

import { Product } from './product.interface';
import { ProductsService } from './products.service';

const debug: Debug.IDebugger = Debug('retail:controller:products');

export class ProductsController {

    public constructor(private readonly _service: ProductsService) {
    }

    public create: ApiHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const { body } = req;

            if (!Object.keys(body).length) {
                throw new BadRequestResult(ErrorCode.InvalidBody, 'Post body is required.');
            }
            const result: Product = await this._service.create(body);
            debug('Product created.');

            ResponseBuilder.ok(result, res);

        } catch (error) {
            if (error instanceof BadRequestResult) {
                return ResponseBuilder.badRequest(error.code, error.description, res);
            }

            if (error instanceof InternalServerErrorResult) {
                return ResponseBuilder.internalServerError(error.code, error.description, res);
            }

            return ResponseBuilder.generalError(error, res);
        }
    }

    // Get products

    public get: ApiHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params: { id, category } } = req;

            if (id) {
                const product: Product = await this._service.getById(id);

                return ResponseBuilder.ok<Product>(product, res);
            }

            let filter: Filter = {};
            if (category) {
                filter = { where: { 'category.ancestors': category } };
            }

            const products: Product[] = await this._service.get(filter);
            ResponseBuilder.ok<Product[]>(products, res);

        } catch (error) {
            if (error instanceof BadRequestResult) {
                return ResponseBuilder.badRequest(error.code, error.description, res);
            }

            if (error instanceof InternalServerErrorResult) {
                return ResponseBuilder.internalServerError(error.code, error.description, res);
            }

            return ResponseBuilder.generalError(error, res);
        }
    }
}
