import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'train-lines',
})
export class TrainLine extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'id' })
  id!: number;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true, field: 'name' })
  name!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false, field: 'stations' })
  stations!: Array<string>;

  @Column({ type: DataType.FLOAT, field: 'fare' })
  fare: number;
}
