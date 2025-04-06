import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { CityName, DocumentExists, Nullable } from '../../types/index.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  find(count: number, userId: string): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string, userId: string): Promise<Nullable<DocumentType<OfferEntity>>>;
  findPremium(city: CityName): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>>;
  updateById(offerId: string, dto: UpdateOfferDTO): Promise<Nullable<DocumentType<OfferEntity>>>;
  updateRatingAndCommentCount(offerId: string, newRating: number): Promise<Nullable<DocumentType<OfferEntity>>>;
  findFavoritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
