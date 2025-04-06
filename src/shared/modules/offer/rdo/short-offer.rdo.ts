import { Expose, Type } from 'class-transformer';
import { Accommodation, City, Location } from '../../../types/index.js';
import { UserRDO } from '../../user/index.js';


export class ShortOfferRDO {
  @Expose()
  public id: string;

  @Expose()
  public title!: string;

  @Expose({ name: 'createdAt' })
  public date!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public accommodation!: Accommodation;

  @Expose()
  public price!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => UserRDO)
  public user!: UserRDO;

  @Expose()
  public location!: Location;
}
