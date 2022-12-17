import { ApplicationError } from '../utils/ApiError';
import { Service } from 'typedi';
import StationRepository from '../repositories/StationRepository';
import { LoggerClient } from './LoggerClient';
import { NextTrainStation } from '../models/Station';

@Service()
export default class StationService {
  constructor(public stationRepository: StationRepository, public logger: LoggerClient) {}

  createStation = async (name: string, train: string, nextStations: Array<string>) => {
    const nextStops: Array<NextTrainStation> = nextStations.map(s => ({train, station: s}))

    console.log(nextStops);
    // For each provided station, perform upsert
    return this.stationRepository.upsertStationWithName(name, nextStops);
  };

  getAllStations = async () => {
    return await this.stationRepository.getAllStations();
  };
}
