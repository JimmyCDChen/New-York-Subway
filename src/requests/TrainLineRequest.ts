import { IsNotEmpty } from 'class-validator';

export class TrainLineRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  stations: Array<string>;
}
