import { IsNotEmpty, IsNumber } from 'class-validator';

export class CardRequest {
  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
