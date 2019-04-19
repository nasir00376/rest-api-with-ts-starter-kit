import { ApiHandler } from '../../shared/common.interface';
import { CategoriesService } from '../categories/categories.service';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const categoryService: CategoriesService = new CategoriesService();
const service: ProductsService = new ProductsService(categoryService);
export const controller: ProductsController = new ProductsController(service);

export const create: ApiHandler = controller.create;
export const get: ApiHandler = controller.get;
