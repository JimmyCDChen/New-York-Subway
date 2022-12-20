import Container, { Service } from 'typedi';
import StationRepository from '../repositories/StationRepository';
import { NextTrainStation } from '../models/Station';
import { BadRequestError } from '../utils/ApiError';
import RideRepository from '../repositories/RideRepository';
import { Action } from '../models/Ride';
import TrainLineRepository from '../repositories/TrainLineRepository';
import CardService from './CardService';
import RouteService from './RouteService';

@Service()
export default class StationService {
  private stationRepository = Container.get(StationRepository);
  private cardService = Container.get(CardService);
  private rideRepository = Container.get(RideRepository);
  private trainLineRepository = Container.get(TrainLineRepository);
  private routeService = Container.get(RouteService);

  createStation(name: string, train: string, nextStations: Array<string>) {
    const nextStops: Array<NextTrainStation> = nextStations.map((s) => ({ train, station: s }));

    // For each provided station, perform upsert
    return this.stationRepository.upsertStationWithName(name, nextStops);
  }

  async enterStation(station: string, card: string) {
    const loadCard = await this.cardService.getCardById(card);
    if (!loadCard) {
      return new BadRequestError(`Card ${card} not found.`, [])
    }
    const loadStation = await this.stationRepository.findByName(station);
    if (!loadStation) {
      return new BadRequestError(`Station ${station} not found.`, [])
    }

    const loadTrain = await this.trainLineRepository.findByName(loadStation.nextStation[0].train);
    // Check for negative card balance
    if (loadCard.amount <= loadTrain!.fare) {
      throw new BadRequestError(`Insufficient fund.`, [])
    }
    const remainingBalance = loadCard.amount - loadTrain!.fare;

    // record ride, update card balance
    // try to be atomic 
    try {
      this.rideRepository.createRide(card, loadStation.id, Action.ENTER);
      this.cardService.updateCardBalance(card, remainingBalance);
    } catch (e) {
      // TODO: revert the completed action when caught
      console.log(`error occured: cardId: ${card}, station: ${station} attempt Action:${Action.ENTER} at ${Date.now()}`)
    }

    return { amount: remainingBalance }
  }

  async exitStation(station: string, card: string) {
    const loadCard = await this.cardService.getCardById(card);
    if (!loadCard) {
      return new BadRequestError(`Card ${card} not found.`, [])
    }
    const loadStation = await this.stationRepository.findByName(station);
    if (!loadStation) {
      return new BadRequestError(`Station ${station} not found.`, [])
    }

    try {
      this.rideRepository.createRide(card, loadStation.id, Action.EXIT);
    } catch (e) {
      // TODO: revert the completed action when caught
      console.log(`error occured: cardId: ${card}, station: ${station} attempt Action:${Action.EXIT} at ${Date.now()}`)
    }

    return { amount: loadCard.amount }
  }

  getAllStations() {
    return this.stationRepository.getAllStations();
  }

  getStationById(id: number) {
    return this.stationRepository.findById(id);
  }

  getStation(name: string) {
    return this.stationRepository.findByName(name);
  }
}
