import { Table, Model, Column, DataType, CreatedAt } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'rides',
})
export class Ride extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'id' })
  id!: number;

  @Column({ type: DataType.STRING(50), allowNull: false, field: 'cardId' })
  cardId!: string;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'stationId' })
  stationId!: number;

  @Column({ type: DataType.STRING(5), allowNull: false, field: 'action' })
  action!: Action;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'createAt' })
  createdAt!: Date;
}

export enum Action {
  ENTER = "ENTER", EXIT = "EXIT"
}