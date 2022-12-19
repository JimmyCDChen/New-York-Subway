import { IsNotEmpty } from 'class-validator';

export class RouteRequest {
  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  destination: string;
}
