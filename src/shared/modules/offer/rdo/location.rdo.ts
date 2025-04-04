import { Expose } from 'class-transformer';

export class LocationRDO {
  @Expose()
    latitude: number;

  @Expose()
    longitude: number;
}
