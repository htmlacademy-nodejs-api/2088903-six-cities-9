import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { OfferService } from './offer-service.interface.js';
import { CityName, COMPONENT_MAP, Nullable, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { OFFER_LIMIT } from './offer-limit.constant.js';
import { calculateOfferLimits } from '../../helpers/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find (count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = calculateOfferLimits(count);

    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate(['userId'])
      .exec();
  }

  public async findPremium (city: CityName): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ createdAt: SortType.Down })
      .limit(OFFER_LIMIT.COUNT.PREMIUM)
      .populate(['userId'])
      .exec();
  }

  public async deleteById (offerId: string): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById (offerId: string, dto: UpdateOfferDTO): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists (documentId: string): Promise<boolean> {
    return this.offerModel
      .exists({_id: documentId})
      .then((r) => !!r);
  }

  public async updateRatingAndCommentCount(offerId: string, newCommentRating: number): Promise<Nullable<DocumentType<OfferEntity>>> {
    const offer = await this.offerModel.findById(offerId).exec();
    if (!offer) {
      return null;
    }

    const totalRating = offer.rating * offer.commentsCount;
    const newCommentsCount = offer.commentsCount + 1;
    const newRating = (totalRating + newCommentRating) / newCommentsCount;

    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        {
          $set: {
            rating: newRating,
            commentsCount: newCommentsCount
          }
        },
        { new: true }
      )
      .exec();
  }
}
