import { Service } from 'typedi';
import { NextTrainStation, Station } from '../models/Station';
@Service()
export default class StationRepository {
  async createStation(name: string, nextStations: Array<NextTrainStation>): Promise<Station> {
    const station = Station.build({ name: name, nextStation: nextStations });
    return await station.save();
  };

  async upsertStationWithName(name: string, nextStations: Array<NextTrainStation>): Promise<any> {
    const station = await this.findByName(name);
    if (station === null) {
      return this.createStation(name, nextStations);
    }

    // Get unique train & next station combo
    const newStations = station.nextStation
      .concat(nextStations)
      .filter((thing, i, arr) => arr.findIndex((t) => t.train === thing.train && t.station === thing.station) === i);
    return await Station.upsert({ id: station.id, name: name, nextStation: newStations });
  };

  async findByName(name: string): Promise<Station | null> {
    return await Station.findOne({ where: { name: name } });
  };

  async getAllStations(): Promise<Station[]> {
    return await Station.findAll();
  };
}
