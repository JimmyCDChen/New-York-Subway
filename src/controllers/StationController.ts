import StationService from '../services/StationService';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { Service } from 'typedi';
import { Request } from 'express';

@Service()
export default class StationController {
  constructor(public stationService: StationService) { }

  getAllStations = asyncWrapper(async () => {
    const response = await this.stationService.getAllStations();
    return new SuccessResponse(response);
  });

  enterStation = asyncWrapper(async (req: Request) => {
    const { station } = req.params
    const { card_number } = req.body
    const response = await this.stationService.enterStation(station, card_number);
    return new SuccessResponse(response);
  });

  exitStation = asyncWrapper(async (req: Request) => {
    const { station } = req.params
    const { card_number } = req.body
    const response = await this.stationService.exitStation(station, card_number);
    return new SuccessResponse(response);
  });

}
