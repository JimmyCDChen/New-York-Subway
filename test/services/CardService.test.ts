import CardService from "../../src/services/CardService"
import TrainLineRepository from "../../src/repositories/TrainLineRepository";
import StationService from "../../src/services/StationService";
import CardRepository from "../../src/repositories/CardRepository";
import { Card } from "../../src/models/Card";

describe('CardService', () => {
    const service = new CardService();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('refill card', () => {
        it('should create new card', async () => {
            jest.spyOn(CardRepository.prototype, "findById").mockImplementation().mockResolvedValueOnce(null);
            const cardRepoCreateSpy = jest.spyOn(CardRepository.prototype, "createCard").mockImplementation();

            await service.refill("1234", 1.0);
            expect(cardRepoCreateSpy).toHaveBeenCalledWith("1234", 1.0);
        });
        it('should update existing card', async () => {
            jest.spyOn(CardRepository.prototype, "findById").mockImplementation().mockResolvedValueOnce({ id: "1234", amount: 1.0 } as Card);
            const cardRepoCreateSpy = jest.spyOn(CardRepository.prototype, "updateCard").mockImplementation();

            await service.refill("1234", 1.0);
            expect(cardRepoCreateSpy).toHaveBeenCalledWith("1234", 2.0);
        });
    });

    describe('create card', () => {
        it('create card should success', async () => {
            const cardRepoCreateSpy = jest.spyOn(CardRepository.prototype, "createCard").mockImplementation();

            await service.refill("1234", 1.0);
            expect(cardRepoCreateSpy).toHaveBeenCalledWith("1234", 1.0);
        });
    });

    describe('update card', () => {
        it('update card should success', async () => {
            const cardRepoCreateSpy = jest.spyOn(CardRepository.prototype, "updateCard").mockImplementation();

            await service.updateCardBalance("1234", 1.0);
            expect(cardRepoCreateSpy).toHaveBeenCalledWith("1234", 1.0);
        });
    });
});