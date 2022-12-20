import { Request } from 'express';
import RouteService from '../services/RouteService';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import Container, { Service } from 'typedi';
import { BadRequestError } from '../utils/ApiError';

@Service()
export default class RouteController {
  private routeService = Container.get(RouteService);

  getRoute = asyncWrapper(async (req: Request) => {
    const origin = req.query.origin as string;
    const destination = req.query.destination as string;

    if (origin === undefined) {
      throw new BadRequestError('origin should not be empty!', []);
    } else if (destination === undefined) {
      throw new BadRequestError('destination should not be empty!', []);
    }

    const response = await this.routeService.getShortestRoute(origin, destination);
    return new SuccessResponse(response);
  });
}
