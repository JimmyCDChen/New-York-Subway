import { Router } from 'express';
import CardRoutes from './CardRoutes';
import Route from './routeAbstract';
import RouteRoutes from './RouteRoutes';
import StationRoutes from './StationRoutes';
import TrainLineRoutes from './TrainLineRoutes';

const app = Router();

const allRoutes: Array<Route> = [new CardRoutes(), new RouteRoutes(), new StationRoutes(), new TrainLineRoutes()];

// load router
for (const route of allRoutes) {
  app.use(route.getPrefix(), route.getRouter());
}

export default app;
