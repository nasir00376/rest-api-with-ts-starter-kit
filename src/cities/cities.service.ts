import * as Debug from 'debug';

import { BadRequestResult } from '../../build/shared/errors';

import { City } from './cities.interfaces';
import { CitiesRepository } from './cities.repository';

const debug: Debug.IDebugger = Debug('retail:service:product');

export class CitiesService {
    public constructor(private readonly _repo: CitiesRepository) {
    }

    // List categories by filter
    public readonly get = async (id?: number): Promise<City | City[]> => {

        if (id && !this._repo.exists(id)) {
            throw new BadRequestResult('UNKNOWN_CITY', 'There is no city with the specified ID!');
        }

        if (id && !this._repo.hasAccess(id)) {
            throw new BadRequestResult('PERMISSION_REQUIRED', 'You have no permission to access the city with the specified ID!');
        }

        const defaultCountry: string = 'Hungary';

        const city: City | City[] = this._repo.get(defaultCountry, id);
        debug(city);

        return city;

    }
}
