import { Service } from 'typedi';
import TrainLineRepository from '../repositories/TrainLineRepository';
import { LoggerClient } from './LoggerClient';
import StationService from './StationService';

@Service()
export default class TrainLineService {
  constructor(public trainLineRepository: TrainLineRepository, public stationService: StationService, public logger: LoggerClient) {}

  createTrain = async (trainName: string, stations: Array<string>) => {
    const result = this.trainLineRepository.createTrainLine(trainName, stations);

    // For each provided station, perform upsert
    stations.forEach((station: string) => {
        const nextStations = this.getAdjacentStations(station, stations);
        this.stationService.createStation(station, trainName, nextStations);
      }
    );

    return result;
  };

  getAllTrainLines = async () => {
    return await this.trainLineRepository.getAllTrainLines();
  };

  private getAdjacentStations = (name: string, stations: Array<string>) => {
    const stationIndex = stations.indexOf(name);
    
    if (stationIndex === 0) {
      return [stations[1]];
    } else if (stationIndex === stations.length - 1) {
      return [stations[stationIndex - 1]];
    } else {
      return [stations[stationIndex - 1], stations[stationIndex + 1]];
    }
  }
}
