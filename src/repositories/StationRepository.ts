import { Service } from 'typedi';
import { NextTrainStation, Station } from '../models/Station';
@Service()
export default class StationRepository {
  createStation = async (name: string, nextStations: Array<NextTrainStation>): Promise<Station> => {
    const station = Station.build({ name, nextStations });
    return await station.save();
  };

  upsertStationWithName = async (name: string, nextStations: Array<NextTrainStation>): Promise<any> => {
    return await Station.upsert({ name, nextStations });
  };

  findByName = async (name: string): Promise<Station | null> => {
    return await Station.findOne({ where: { name: name } });
  };

  getAllStations = async (): Promise<Station[]> => {
    return await Station.findAll();
  };
}
