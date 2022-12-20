import { Service } from 'typedi';
import { TrainLine } from '../models/TrainLine';
@Service()
export default class TrainLineRepository {
  async createTrainLine(name: string, stations: Array<string>, fare: number): Promise<TrainLine> {
    const trainLine = TrainLine.build({ name, stations, fare });
    return await trainLine.save();
  }

  async findByName(name: string): Promise<TrainLine | null> {
    return await TrainLine.findOne({ where: { name: name } });
  }

  async getAllTrainLines(): Promise<TrainLine[]> {
    return await TrainLine.findAll();
  }
}
