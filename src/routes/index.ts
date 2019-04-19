import { App } from '../../shared/common.interface';
import { citiesRoutes } from '../cities/cities.routes';

// Register all routes in app
export function routes(app: App): void {
    app.use('/api/cities', citiesRoutes);
}
