import { Router } from 'express';
import Route from './routeAbstract';
import RouteRoute from './RouteRoutes';
import StationRoute from './StationRoutes';
import TrainLineRoute from './TrainLineRoutes';

const app = Router();

const allRoutes: Array<Route> = [
  new RouteRoute(),
  new StationRoute(),
  new TrainLineRoute(),
];

// load router
for (const route of allRoutes) {
  app.use(route.getPrefix(), route.getRouter());
}

export default app;
