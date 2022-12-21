import StationService from "../../src/services/StationService"
import TrainLineRepository from "../../src/repositories/TrainLineRepository";
import StationRepository from "../../src/repositories/StationRepository";
import { Card } from "../../src/models/Card";
import { Station } from "../../src/models/Station";
import CardService from "../../src/services/CardService";
import { TrainLine } from "../../src/models/TrainLine";
import RideRepository from "../../src/repositories/RideRepository";
import { Action } from "../../src/models/Ride";

describe('StationService', () => {
    const service = new StationService();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create station', () => {
        it('create station should success', async () => {
            const stationRepoCreateSpy = jest.spyOn(StationRepository.prototype, "createStation").mockImplementation();
            const findByName = jest.spyOn(StationRepository.prototype, "findByName").mockImplementation().mockResolvedValueOnce(null);

            await service.createStation("Spring", "A", []);
            expect(stationRepoCreateSpy).toHaveBeenCalledWith("Spring", []);
            expect(findByName).toHaveBeenCalledWith("Spring");
        });
    });

    describe('update station', () => {
        it('update station with name should success', async () => {
            const upsertStationWithName = jest.spyOn(StationRepository.prototype, "upsertStationWithName").mockImplementation().mockResolvedValueOnce({});

            await service.createStation("Spring", "A", ["West 4th"]);
            expect(upsertStationWithName).toHaveBeenCalledWith("Spring", [{ train: "A", station: "West 4th" }]);

        });
    });

    describe('enter station', () => {
        it('enter valid station with valid card should success', async () => {
            const cardServiceSpy = jest.spyOn(CardService.prototype, "getCardById").mockResolvedValueOnce({ id: "123", amount: 20.0 } as Card)
            const cardServiceUpdateSpy = jest.spyOn(CardService.prototype, "updateCardBalance").mockResolvedValueOnce({ id: "123", amount: 20.0 } as Card)
            const stationFindByNameSpy = jest.spyOn(StationRepository.prototype, "findByName").mockImplementation()
                .mockResolvedValueOnce({ id: 1, name: "Spring", nextStation: [{ station: "Canal", train: "A" }] } as Station);
            const trainFindByNameSpy = jest.spyOn(TrainLineRepository.prototype, "findByName").mockImplementation().mockResolvedValueOnce({ name: "A", stations: ["Spring"], fare: 2.0 } as TrainLine)
            const createRideSpy = jest.spyOn(RideRepository.prototype, "createRide").mockImplementation()

            await service.enterStation("Spring", "123");
            expect(cardServiceSpy).toHaveBeenCalledWith("123");
            expect(stationFindByNameSpy).toHaveBeenCalledWith("Spring");
            expect(createRideSpy).toHaveBeenCalledWith("123", 1, Action.ENTER);
            expect(cardServiceUpdateSpy).toHaveBeenCalledWith("123", 18.0);

        });
        it(`throw error when card is invalid`, async () => {
            jest.spyOn(CardService.prototype, "getCardById").mockResolvedValueOnce(null)
            const result = await service.enterStation("Spring", "123")
            expect(result.toString()).toEqual("Error: Card 123 not found.")
        })
        it(`throw error when station is invalid`, async () => {
            jest.spyOn(CardService.prototype, "getCardById").mockResolvedValueOnce({ id: "123", amount: 20.0 } as Card)
            jest.spyOn(StationRepository.prototype, "findByName").mockImplementation()
                .mockResolvedValueOnce(null);
            const result = await service.enterStation("Spring", "123")
            expect(result.toString()).toEqual("Error: Station Spring not found.")
        })
    });

    describe('exit station', () => {
        it('exit valid station with valid card should success', async () => {
            const cardServiceSpy = jest.spyOn(CardService.prototype, "getCardById").mockResolvedValueOnce({ id: "123", amount: 20.0 } as Card)
            const stationFindByNameSpy = jest.spyOn(StationRepository.prototype, "findByName").mockImplementation()
                .mockResolvedValueOnce({ id: 1, name: "Spring", nextStation: [{ station: "Canal", train: "A" }] } as Station);
            const trainFindByNameSpy = jest.spyOn(TrainLineRepository.prototype, "findByName").mockImplementation().mockResolvedValueOnce({ name: "A", stations: ["Spring"], fare: 2.75 } as TrainLine)
            const createRideSpy = jest.spyOn(RideRepository.prototype, "createRide").mockImplementation()

            await service.exitStation("Spring", "123");
            expect(cardServiceSpy).toHaveBeenCalledWith("123");
            expect(stationFindByNameSpy).toHaveBeenCalledWith("Spring");
            expect(createRideSpy).toHaveBeenCalledWith("123", 1, Action.EXIT);
        });
        it(`throw error when card is invalid`, async () => {
            jest.spyOn(CardService.prototype, "getCardById").mockResolvedValueOnce(null)
            const result = await service.exitStation("Spring", "123")
            expect(result.toString()).toEqual("Error: Card 123 not found.")
        })
        it(`throw error when station is invalid`, async () => {
            jest.spyOn(CardService.prototype, "getCardById").mockResolvedValueOnce({ id: "123", amount: 20.0 } as Card)
            jest.spyOn(StationRepository.prototype, "findByName").mockImplementation()
                .mockResolvedValueOnce(null);
            const result = await service.exitStation("Spring", "123")
            expect(result.toString()).toEqual("Error: Station Spring not found.")
        })
    });
});