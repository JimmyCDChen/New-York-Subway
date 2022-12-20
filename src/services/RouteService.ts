import Container, { Service } from 'typedi';
import StationRepository from '../repositories/StationRepository';
import { FloydWarshall, Edge } from 'floyd-warshall-shortest';
import { Station } from '../models/Station';
import { BadRequestError } from '../utils/ApiError';

@Service()
export default class RouteService {
  private stationRepository = Container.get(StationRepository);


  async getShortestRoute(origin: string, destination: string) {
    const shortestRoute = await this.computeShortestPath(origin, destination);
    return { route: shortestRoute.map(it => it.name) };
  }

  async getShortestRouteTrains(origin: string, destination: string) {
    const shortestRoute = await this.computeShortestPath(origin, destination);

    // get to one stop before destination
    let allTrainsToTake: Array<string> = []
    for (let s = 0; s < shortestRoute.length - 1; s++) {
      const nextStop = shortestRoute[s].nextStation.filter(it => it.station === shortestRoute[s + 1].name)[0]
      if (!allTrainsToTake.find(train => train === nextStop.train)) {
        allTrainsToTake = allTrainsToTake.concat([nextStop.train]);
      }
    }

    return { trains: allTrainsToTake };
  }

  /* Could implement pre compute map of station-tain map to reduce compute time */

  private async computeShortestPath(origin: string, destination: string) {
    const edges: Edge<Station>[] = [];
    const stations = await this.stationRepository.getAllStations();
    const stationsMap = stations.reduce((map, obj) => {
      map.set(obj.name, obj);
      return map;
    }, new Map<string, Station>());

    if (!stationsMap.get(origin)) {
      throw new BadRequestError(`No station found: ${origin}`, [])
    } else if (!stationsMap.get(destination)) {
      throw new BadRequestError(`No station found: ${destination}`, [])
    } else {
      // Construct Graph Edges
      for (const station of stations) {
        station.nextStation.forEach((it) => {
          edges.push({ from: station, to: stationsMap.get(it.station)!, weight: 1 });
        });
      }
      // Adopt FloydWarshall algorithm to determine the shortest path between stations
      const graph = new FloydWarshall(edges, false);
      return graph.getShortestPath(stationsMap.get(origin)!, stationsMap.get(destination)!);
    }
  }
}
