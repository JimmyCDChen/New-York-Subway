import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'train-lines',
})
export class TrainLine extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}
