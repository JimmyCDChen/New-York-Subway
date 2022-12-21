import RouteService from "../../src/services/RouteService"
import TrainLineRepository from "../../src/repositories/TrainLineRepository";
import StationService from "../../src/services/StationService";
import CardRepository from "../../src/repositories/CardRepository";
import { Card } from "../../src/models/Card";
import StationRepository from "../../src/repositories/StationRepository";
import { Station } from "../../src/models/Station";

describe('RouteService', () => {
    const service = new RouteService();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Get shortest route', () => {
        it('should return shortest route', async () => {
            const stations = [
                {
                    "id": 1,
                    "name": "Canal",
                    "nextStation": [
                        {
                            "train": "2",
                            "station": "Houston"
                        }
                    ]
                } as Station,
                {
                    "id": 2,
                    "name": "Houston",
                    "nextStation": [
                        {
                            "train": "2",
                            "station": "Canal"
                        },
                        {
                            "train": "2",
                            "station": "Christopher"
                        }
                    ]
                } as Station,
                {
                    "id": 3,
                    "name": "Christopher",
                    "nextStation": [
                        {
                            "train": "2",
                            "station": "Houston"
                        },
                        {
                            "train": "2",
                            "station": "14th"
                        }
                    ]
                } as Station,
                {
                    "id": 5,
                    "name": "Spring",
                    "nextStation": [
                        {
                            "train": "E",
                            "station": "West 4th"
                        }
                    ]
                } as Station,
                {
                    "id": 6,
                    "name": "23rd",
                    "nextStation": [
                        {
                            "train": "E",
                            "station": "14th"
                        }
                    ]
                } as Station,
                {
                    "id": 7,
                    "name": "West 4th",
                    "nextStation": [
                        {
                            "train": "E",
                            "station": "Spring"
                        },
                        {
                            "train": "E",
                            "station": "14th"
                        }
                    ]
                } as Station,
                {
                    "id": 4,
                    "name": "14th",
                    "nextStation": [
                        {
                            "train": "2",
                            "station": "Christopher"
                        },
                        {
                            "train": "E",
                            "station": "West 4th"
                        },
                        {
                            "train": "E",
                            "station": "23rd"
                        }
                    ]
                } as Station
            ]
            const stationRepoSpy = jest.spyOn(StationRepository.prototype, "getAllStations").mockImplementation()
                .mockResolvedValue(stations);

            const path = await service.getShortestRoute("Houston", "23rd");
            expect(stationRepoSpy).toHaveBeenCalledTimes(1);
            expect(path).toEqual({
                route: [
                    "Houston",
                    "Christopher",
                    "14th",
                    "23rd"
                ]
            })

            const path2 = await service.getShortestRoute("Houston", "14th");
            expect(stationRepoSpy).toHaveBeenCalledTimes(2);
            expect(path2).toEqual({
                route: [
                    "Houston",
                    "Christopher",
                    "14th"
                ]
            })

            const path3 = await service.getShortestRoute("Houston", "Houston");
            expect(stationRepoSpy).toHaveBeenCalledTimes(3);
            expect(path3).toEqual({
                route: [
                    "Houston"
                ]
            })
        });

        it(`throw error when station is not found`, async () => {
            jest.spyOn(StationRepository.prototype, "getAllStations").mockResolvedValueOnce([])
            try {
                await service.getShortestRoute("123", "123")
            } catch (e: any) {
                expect(e.statusCode).toEqual(400)
            }
        })


        it(`return empty route when no connected station is origin or destination`, async () => {
            const stations = [
                {
                    "id": 1,
                    "name": "Canal",
                    "nextStation": [
                        {
                            "train": "2"
                        }
                    ]
                } as Station,
                {
                    "id": 2,
                    "name": "StandAlone",
                    "nextStation": [
                        {
                            "train": "H"
                        }
                    ]
                } as Station
            ]
            jest.spyOn(StationRepository.prototype, "getAllStations").mockResolvedValueOnce(stations)
            try {
                await service.getShortestRoute("StandAlone", "Canal")
            } catch (e: any) {
                expect(e.toString()).toEqual("Error: Unknown node")
            }
        })

    });
});