import Container, { Service } from 'typedi';
import { TrainLine } from '../models/TrainLine';
import TrainLineRepository from '../repositories/TrainLineRepository';
import { LoggerClient } from './LoggerClient';
import StationService from './StationService';

@Service()
export default class TrainLineService {
  private trainLineRepository = Container.get(TrainLineRepository);
  private stationService = Container.get(StationService);
  private logger = Container.get(LoggerClient);

  createTrain(trainName: string, stations: Array<string>, fare: number): Promise<TrainLine> {
    const result = this.trainLineRepository.createTrainLine(trainName, stations, fare);

    // For each provided station, perform upsert
    stations.forEach((station: string) => {
      const nextStations = this.getAdjacentStations(station, stations);
      this.stationService.createStation(station, trainName, nextStations);
    });

    return result;
  }

  getAllTrainLines(): Promise<TrainLine[]> {
    return this.trainLineRepository.getAllTrainLines();
  }

  getTrainByName(name: string): Promise<TrainLine | null> {
    return this.trainLineRepository.findByName(name);
  }

  private getAdjacentStations = (name: string, stations: Array<string>) => {
    const stationIndex = stations.indexOf(name);

    if (stationIndex === 0) {
      return [stations[1]];
    } else if (stationIndex === stations.length - 1) {
      return [stations[stationIndex - 1]];
    } else {
      return [stations[stationIndex - 1], stations[stationIndex + 1]];
    }
  };
}
