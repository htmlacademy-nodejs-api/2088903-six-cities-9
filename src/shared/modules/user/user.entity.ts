import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import {OfferRef} from '../../types/entity-refs.js';

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
  public favorites?: OfferRef[];

  constructor(userData: User, salt: string) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
    this.password = createSHA256(userData.password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
