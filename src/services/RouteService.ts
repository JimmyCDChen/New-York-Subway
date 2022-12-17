import { Service } from 'typedi';
import StationRepository from '../repositories/StationRepository';
import { LoggerClient } from './LoggerClient';
import { FloydWarshall, Edge } from 'floyd-warshall-shortest';

@Service()
export default class RouteService {
    constructor(
        public stationRepository: StationRepository,
        public logger: LoggerClient) {}

    getRoute = async (origin: string, destination: string) => {
        const edges: Edge<string>[] = []; 
        const stations = await this.stationRepository.getAllStations()
        for (const station of stations) {
            station.nextStation.forEach (it => {
                edges.push({from: station.name, to: it.station, weight: 1})
            })
        }
        const graph = new FloydWarshall(edges, false);
        return graph.getShortestPath(origin, destination);
    }
}
