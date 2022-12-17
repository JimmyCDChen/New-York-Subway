import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'stations',
})
export class Station extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'Id' })
  id!: number;

  @Column({ type: DataType.STRING(50), allowNull: false, field: 'name'})
  name!: string;
  
  @Column({ type: DataType.ARRAY(DataType.JSON), allowNull: false, field: 'nextStation'})
  nextStation!: Array<NextTrainStation>;
}

export interface NextTrainStation {
  train: string;
  station: string;
}