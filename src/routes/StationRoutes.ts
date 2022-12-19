import { Container } from 'typedi';
import StationController from '../controllers/StationController';
import Route from './routeAbstract';

class StationRoutes extends Route {
  private stationController = Container.get(StationController);

  constructor() {
    super();
    this.prefix = '/station';
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('/', this.stationController.getAllStations);
  }
}

export default StationRoutes;
