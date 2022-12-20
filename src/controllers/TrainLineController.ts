import { Request } from 'express';
import TrainLineService from '../services/TrainLineService';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { Service } from 'typedi';

@Service()
export default class TrainLineController {
  constructor(public trainLineService: TrainLineService) { }

  createTrainLines = asyncWrapper(async (req: Request) => {
    const { name, stations, fare } = req.body;
    const response = await this.trainLineService.createTrain(name, stations, fare);
    return new SuccessResponse(response);
  });

  getAllTrainLines = asyncWrapper(async () => {
    const response = await this.trainLineService.getAllTrainLines();
    return new SuccessResponse(response);
  });
}
