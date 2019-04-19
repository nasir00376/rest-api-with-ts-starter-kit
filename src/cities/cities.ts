import { ApiHandler } from '../../shared/common.interface';

import { CitiesController } from './cities.controller';
import { CitiesRepository } from './cities.repository';
import { CitiesService } from './cities.service';

const repo: CitiesRepository = new CitiesRepository();
const service: CitiesService = new CitiesService(repo);
export const controller: CitiesController = new CitiesController(service);

export const get: ApiHandler = controller.get;
