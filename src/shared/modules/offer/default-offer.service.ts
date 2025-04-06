import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';

import {OfferService} from './offer-service.interface.js';
import {CityName, COMPONENT_MAP, Nullable, SortType} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {UpdateOfferDTO} from './dto/update-offer.dto.js';
import {OFFER_LIMIT} from './offer-limit.constant.js';
import {calculateOfferLimits} from '../../helpers/index.js';
import {Types} from 'mongoose';
import {addFavoriteStatusPipeline, USER_LOOKUP_PIPELINE} from './index.js';
import {CommentService} from '../comment/index.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(COMPONENT_MAP.COMMENT_SERVICE) private readonly commentService: CommentService
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async find (count: number, userId: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = calculateOfferLimits(count);

    return await this.offerModel
      .aggregate([
        ...USER_LOOKUP_PIPELINE,
        ...addFavoriteStatusPipeline(userId),
        {$sort: {createdAt: SortType.Down}},
        {$limit: limit},
      ])
      .exec();
  }

  public async findById(offerId: string, userId: string): Promise<Nullable<DocumentType<OfferEntity>>>{
    const result = await this.offerModel
      .aggregate([
        { $match: { '_id': new Types.ObjectId(offerId) } },
        ...USER_LOOKUP_PIPELINE,
        ...addFavoriteStatusPipeline(userId, offerId),
      ])
      .exec();

    return result[0] || null;
  }

  public async findPremium (city: CityName, userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        { $match: { 'city': city, isPremium: true } },
        ...USER_LOOKUP_PIPELINE,
        ...addFavoriteStatusPipeline(userId),
        { $sort: { createdAt: SortType.Down } },
        { $limit: OFFER_LIMIT.COUNT.PREMIUM },
      ]);
  }

  public async updateById (offerId: string, dto: UpdateOfferDTO): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById (offerId: string): Promise<Nullable<DocumentType<OfferEntity>>> {
    const result = await this.offerModel
      .findByIdAndDelete(offerId)
      .exec();

    await this.commentService.deleteByOfferId(offerId);
    return result;
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
            rating: newRating.toFixed(OFFER_LIMIT.RATING.DECIMAL_PLACE),
            commentsCount: newCommentsCount
          }
        },
        { new: true }
      )
      .exec();
  }

  public async findFavoritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...USER_LOOKUP_PIPELINE,
        ...addFavoriteStatusPipeline(userId),
        { $match: { isFavorite: true }},
      ])
      .exec();
  }

  public async isOfferAuthor(offerId: string, userId: string): Promise<boolean> {
    const offer = await this.offerModel.findOne({ _id: offerId });

    return offer?.userId?.toString() === userId;
  }
}
