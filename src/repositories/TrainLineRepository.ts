import { Service } from 'typedi';
import { TrainLine } from '../models/TrainLine';
@Service()
export default class TrainLineRepository {
  createTrainLine = async (name: string): Promise<TrainLine> => {
    const trainLine = TrainLine.build({ name });
    return await trainLine.save();
  };

  findByName = async (name: string): Promise<TrainLine | null> => {
    return await TrainLine.findOne({ where: { name: name } });
  };

  getAllTrainLines = async (): Promise<TrainLine[]> => {
    return await TrainLine.findAll();
  };
}
