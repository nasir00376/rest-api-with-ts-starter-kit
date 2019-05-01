import { City } from './cities.interfaces';
// tslint:disable-next-line:no-default-import
import CityModel from './cities.model';
// tslint:disable-next-line:no-default-import
// Import City from './cities.model';
export class CitiesRepository {

    public exists = (id: number): boolean => id > 0;

    public get = (defaultCountry: string, id?: number): City | City[] => {
        if (!id) {
            return CityModel.findAll();
        }

        return {
            country: defaultCountry,
            id,
            name: 'Budapest',
            populationDensity: Math.random()
        };

    }

    public hasAccess = (id: number): boolean => id !== 666;   // tslint:disable-line no-magic-numbers (Demo number.)
}
