import express from 'express';
import trainLineRoute from './TrainLineRoute';

const router = express.Router();

const allRoutes = [
  {
    path: '/train-line',
    route: trainLineRoute,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
