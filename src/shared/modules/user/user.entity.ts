import {defaultClasses, DocumentType, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import {OfferRef} from '../../types/entity-refs.js';
import {OfferEntity} from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: true, default: UserType.Regular })
  public type: UserType;

  @prop({
    ref: 'OfferEntity',
    required: true,
    default: [],
  })
  public favorites: OfferRef[];

  @prop({
    ref: 'OfferEntity',
    foreignField: '_id',
    localField: 'favorites',
    justOne: false,
  })
  public favoriteOffers?: DocumentType<OfferEntity>[];

  constructor(userData: User, salt: string) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
    this.password = createSHA256(userData.password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
