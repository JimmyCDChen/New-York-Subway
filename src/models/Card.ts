import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'cards',
})
export class Card extends Model {
  @Column({ type: DataType.STRING(50), primaryKey: true, unique: true, field: 'id' })
  id!: string;

  @Column({ type: DataType.FLOAT, allowNull: false, unique: false, field: 'amount' })
  amount!: number;
}