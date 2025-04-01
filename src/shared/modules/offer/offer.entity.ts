import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { Location, CityName, Accommodation, Amenities } from '../../types/index.js';
import {UserRef} from '../../types/entity-refs.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ type: () => String, enum: CityName, required: true })
  public city!: CityName;

  @prop({ required: true })
  public preview!: string;

  @prop({ required: true })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({ type: () => String, enum: Accommodation, required: true })
  public accommodation!: Accommodation;

  @prop({ required: true })
  public rooms!: number;

  @prop({ required: true })
  public guests!: number;

  @prop({ required: true })
  public price!: number;

  @prop({ type: () => String, enum: Amenities, required: true })
  public amenities!: Amenities[];

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({ required: true })
  public location!: Location;

  @prop({ ref: 'UserEntity', required: true })
  public userId!: UserRef;

  @prop({ default: 0 })
  public totalRating!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
