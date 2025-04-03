import { Expose, Type } from 'class-transformer';
import { Accommodation, Amenities, CityName, Location } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';


export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({ name: 'createdAt' })
  public date: Date;

  @Expose()
  public city: CityName;

  @Expose()
  public preview: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public accommodation: Accommodation;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: Amenities[];

  @Expose()
  @Type(() => UserRdo)
  public userId: string;

  @Expose()
  public commentCount: number;

  @Expose()
  public location: Location;
}
