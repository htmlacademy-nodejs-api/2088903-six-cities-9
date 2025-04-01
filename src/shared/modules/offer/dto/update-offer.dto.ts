import { Accommodation, Amenities, CityName, Location } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: CityName;
  public preview?: string;
  public images?: string[];
  public isPremium?: boolean;
  public rating: number;
  public accommodation?: Accommodation;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public amenities?: Amenities[];
  public userId?: string;
  public commentsCount?: number;
  public location?: Location;
}
