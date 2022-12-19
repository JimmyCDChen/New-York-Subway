import StationService from '../services/StationService';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { Service } from 'typedi';

@Service()
export default class StationController {
  constructor(public stationService: StationService) {}

  getAllStations = asyncWrapper(async () => {
    const response = await this.stationService.getAllStations();
    return new SuccessResponse(response);
  });
}
