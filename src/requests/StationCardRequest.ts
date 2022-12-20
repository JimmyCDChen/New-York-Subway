import { IsNotEmpty } from 'class-validator';

export class StationCardRequest {
  @IsNotEmpty()
  card_number: string;
}
