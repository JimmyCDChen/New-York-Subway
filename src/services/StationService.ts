import Container, { Service } from 'typedi';
import StationRepository from '../repositories/StationRepository';
import { NextTrainStation } from '../models/Station';

@Service()
export default class StationService {
  private stationRepository = Container.get(StationRepository);

  createStation(name: string, train: string, nextStations: Array<string>) {
    const nextStops: Array<NextTrainStation> = nextStations.map((s) => ({ train, station: s }));

    // For each provided station, perform upsert
    return this.stationRepository.upsertStationWithName(name, nextStops);
  };

  getAllStations() {
    return this.stationRepository.getAllStations();
  };
}
