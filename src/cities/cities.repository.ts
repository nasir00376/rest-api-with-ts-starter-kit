import { City } from './cities.interfaces';


export class CitiesRepository {

    public exists = (id: number): boolean => id > 0;

    public get = (defaultCountry: string, id?: number): City | City[] => {
        if (!id) {
            return [
                {
                    country: defaultCountry,
                    id: id || 1,
                    name: 'Budapest',
                    populationDensity: Math.random()
                }
            ];
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
