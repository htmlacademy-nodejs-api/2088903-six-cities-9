import { Expose, Type } from 'class-transformer';
import { Accommodation, Amenities, CityName } from '../../../types/index.js';
import { UserRDO } from '../../user/index.js';
import { LocationRDO } from './location.rdo.js';


export class OfferRDO {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt' })
  public date!: Date;

  @Expose()
  public city!: CityName;

  @Expose()
  public preview!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public accommodation!: Accommodation;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public amenities!: Amenities[];

  @Expose()
  @Type(() => UserRDO)
  public userId!: UserRDO;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => LocationRDO)
  public location!: LocationRDO;
}
