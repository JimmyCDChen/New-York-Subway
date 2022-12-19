import RequestValidator from '../middlewares/RequestValidator';
import { Container } from 'typedi';
import TrainLineController from '../controllers/TrainLineController';
import { TrainLineRequest } from '../requests/TrainLineRequest';
import Route from './routeAbstract';

class TrainLineRoutes extends Route {
  private trainLineController = Container.get(TrainLineController);

  constructor() {
    super();
    this.prefix = '/train-line';
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('/', this.trainLineController.getAllTrainLines);
    this.router.post('/', RequestValidator.validate(TrainLineRequest), this.trainLineController.createTrainLines);
  }
}

export default TrainLineRoutes;
