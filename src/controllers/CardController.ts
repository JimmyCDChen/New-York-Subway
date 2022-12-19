import { Request } from 'express';
import CardService from '../services/CardService';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { Service } from 'typedi';

@Service()
export default class CardController {
  constructor(public cardService: CardService) { }

  refill = asyncWrapper(async (req: Request) => {
    const { number, amount } = req.body;
    const response = await this.cardService.refill(number, amount);
    return new SuccessResponse(response);
  });

  getAllCards = asyncWrapper(async () => {
    const response = await this.cardService.getAllCards();
    return new SuccessResponse(response);
  });
}
