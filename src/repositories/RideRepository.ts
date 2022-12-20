import { sortBy } from 'lodash';
import sequelize = require('sequelize');
import { Service } from 'typedi';
import { Action, Ride } from '../models/Ride';
@Service()
export default class RideRepository {
  async createRide(cardId: string, stationId: number, action: Action): Promise<Ride> {
    const ride = Ride.build({ cardId, stationId, action, createdAt: sequelize.literal('CURRENT_TIMESTAMP') });
    return await ride.save();
  };

  async findLastRide(cardId: string, action: Action): Promise<Ride | null> {
    return await Ride.findOne({ where: { cardId, action }, order: [['createdAt', 'DESC']], });
  };

  async getAllRides(): Promise<Ride[]> {
    return await Ride.findAll();
  };
}
