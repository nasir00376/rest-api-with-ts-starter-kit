import * as Debug from 'debug';

import { ApiHandler, Request, Response } from '../../shared/common.interface';
import { BadRequestResult, InternalServerErrorResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';

import { City } from './cities.interfaces';
import { CitiesService } from './cities.service';

const debug: Debug.IDebugger = Debug('retail:controller:products');

export class CitiesController {

    public constructor(private readonly _service: CitiesService) {
    }
    // Get cities

    public get: ApiHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params: { id } } = req;

            // if (!id) {
            //     throw new BadRequestResult(ErrorCode.InvalidId, 'Please specify the city ID!');
            // }

            const result: City | City[] = await this._service.get(id);

            debug(result);
            return ResponseBuilder.ok<City | City[]>(result, res);
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
