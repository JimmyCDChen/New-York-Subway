import { Service } from 'typedi';
import { Card } from '../models/Card';
@Service()
export default class CardRepository {
  async createCard(id: string, amount: number): Promise<Card> {
    const card = Card.build({ id, amount });
    return await card.save();
  };

  async updateCard(id: string, amount: number): Promise<Card | null> {
    return Card.update(
      {
        amount: amount,
      },
      { where: { id: id } }
    ).then(() => { return Card.findByPk(id) });
  };

  async findById(id: string): Promise<Card | null> {
    return await Card.findByPk(id);
  };

  async getAllCards(): Promise<Card[]> {
    return await Card.findAll();
  };
}
