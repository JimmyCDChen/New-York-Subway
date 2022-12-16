import { IsEmail, IsNotEmpty } from 'class-validator';

export class TrainLineRequest {
  @IsNotEmpty()
  @IsEmail()
  name: string;

  @IsNotEmpty()
  station: Array<string>;
}
