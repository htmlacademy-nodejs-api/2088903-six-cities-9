import { IsEnum } from 'class-validator';
import { CityName } from '../../../types/index.js';

export class PremiumDTO {
  @IsEnum(CityName)
  public city!: CityName;
}
