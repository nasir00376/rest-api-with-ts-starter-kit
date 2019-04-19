import { Router } from 'express';

import { create, get } from './products';

const router: Router = Router();

router.post('/', create);
router.get('/', get);
router.get('/:id', get);
router.get('/category/:category', get);

export const productsRoutes: Router = router;
