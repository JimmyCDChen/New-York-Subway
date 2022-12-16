import { Router } from 'express';
import Route from './routeAbstract';
import TrainLineRoute from './TrainLineRoutes';

const app = Router();

const allRoutes: Array<Route> = [
  new TrainLineRoute(),
];

// load router
for (const route of allRoutes) {
  app.use(route.getPrefix(), route.getRouter());
}

export default app;
