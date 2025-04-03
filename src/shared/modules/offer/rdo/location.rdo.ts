import { Expose } from 'class-transformer';

export class LocationRdo {
  @Expose()
    latitude: number;

  @Expose()
    longitude: number;
}
