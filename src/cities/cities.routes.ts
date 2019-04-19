import { Router } from 'express';

import { get } from './cities';

const router: Router = Router();

router.get('/', get);
router.get('/:id', get);

export const citiesRoutes: Router = router;
