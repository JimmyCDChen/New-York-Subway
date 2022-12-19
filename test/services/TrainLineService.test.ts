import TrainLineService from "../../src/services/TrainLineService"
import TrainLineRepository from "../../src/repositories/TrainLineRepository";
import StationService from "../../src/services/StationService";

describe('TrainLineService', () => {
    const service = new TrainLineService();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createTrain should success', () => {
        it('should get the latest exchange rate', async () => {
            const trainLineRepoSpy = jest.spyOn(TrainLineRepository.prototype, "createTrainLine").mockImplementation();
            const stationServiceSpy = jest.spyOn(StationService.prototype, 'createStation').mockImplementation()
                .mockResolvedValueOnce({ name: "Spring", train: "E", nextStations: ["West 4th"] })
                .mockResolvedValueOnce({ name: "West 4th", train: "E", nextStations: ["Spring", "14th"] })
                .mockResolvedValueOnce({ name: "14th", train: "E", nextStations: ["West 4th", "23rd"] })
                .mockResolvedValueOnce({ name: "23rd", train: "E", nextStations: ["14th"] });
            await service.createTrain("E", ["Spring", "West 4th", "14th", "23rd"]);
            expect(trainLineRepoSpy).toHaveBeenCalledWith("E", ["Spring", "West 4th", "14th", "23rd"]);
            expect(stationServiceSpy).toHaveBeenCalledTimes(4)
        });
    });
});