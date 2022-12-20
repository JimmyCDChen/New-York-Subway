import Container, { Service } from 'typedi';
import CardRepository from '../repositories/CardRepository';
import { LoggerClient } from './LoggerClient';

@Service()
export default class CardService {
  private cardRepository = Container.get(CardRepository);
  private logger = Container.get(LoggerClient);

  // create or update
  async refill(cardId: string, amount: number) {
    const card = await this.cardRepository.findById(cardId);
    if (!card) {
      return this.cardRepository.createCard(cardId, amount);
    } else {
      return this.cardRepository.updateCard(cardId, amount + card.amount)
    }
  }

  getAllCards() {
    return this.cardRepository.getAllCards();
  }

  async getCardById(id: string) {
    return this.cardRepository.findById(id);
  }

  async updateCardBalance(id: string, balance: number) {
    return this.cardRepository.updateCard(id, balance);
  }
}
