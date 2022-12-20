import { Container } from 'typedi';
import StationController from '../controllers/StationController';
import RequestValidator from '../middlewares/RequestValidator';
import { StationCardRequest } from '../requests/StationCardRequest';
import Route from './RouteAbstract';

class StationRoutes extends Route {
  private stationController = Container.get(StationController);

  constructor() {
    super();
    this.prefix = '/station';
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('/', this.stationController.getAllStations);
    this.router.post(`/:station/enter`, RequestValidator.validate(StationCardRequest), this.stationController.enterStation)
    this.router.post('/:station/exit', RequestValidator.validate(StationCardRequest), this.stationController.exitStation)
  }
}

export default StationRoutes;
