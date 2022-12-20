import { Container } from 'typedi';
import RouteController from '../controllers/RouteController';
import Route from './RouteAbstract';

class RouteRoutes extends Route {
  private routeController = Container.get(RouteController);

  constructor() {
    super();
    this.prefix = '/route';
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('/', this.routeController.getRoute);
  }
}

export default RouteRoutes;
