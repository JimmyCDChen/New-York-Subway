import { Container } from 'typedi';
import CardController from '../controllers/CardController';
import RequestValidator from '../middlewares/RequestValidator';
import { CardRequest } from '../requests/CardRequest';
import Route from './RouteAbstract';

class CardRoutes extends Route {
  private cardController = Container.get(CardController);

  constructor() {
    super();
    this.prefix = '/card';
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('/', this.cardController.getAllCards);
    this.router.post('/', RequestValidator.validate(CardRequest), this.cardController.refill);
  }
}

export default CardRoutes;
