import { Ref } from '@typegoose/typegoose';
import { UserEntity } from '../modules/user/index.js';
import { OfferEntity } from '../modules/offer/index.js';

export type UserRef = Ref<UserEntity>;
export type OfferRef = Ref<OfferEntity>;
