import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { OfferService } from '../offer/index.js';
import { Logger } from '../../libs/logger/index.js';

import { COMPONENT_MAP, SortType } from '../../types/index.js';
import { COMMENT_LIMIT } from './comment-limit.constant.js';


@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(COMPONENT_MAP.COMMENT_MODEL) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
  ) {}

  public async create (dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${comment._id}`);

    const { offerId, rating: newCommentRating } = dto;

    await this.offerService.incCommentCount(offerId);
    await this.offerService.updateRating(offerId, newCommentRating);

    return comment.populate('userId');
  }

  public async findByOfferId (offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortType.Down })
      .limit(COMMENT_LIMIT.MAX_COMMENT_COUNT)
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }
}
