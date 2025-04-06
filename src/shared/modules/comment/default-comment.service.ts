import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { Logger } from '../../libs/logger/index.js';

import { COMPONENT_MAP, Nullable, SortType } from '../../types/index.js';
import { COMMENT_LIMIT } from './comment-limit.constant.js';


@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(COMPONENT_MAP.COMMENT_MODEL) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
  ) {}

  public async create (dto: CreateCommentDTO, offerId: string): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create({ ...dto, offerId});
    this.logger.info(`New comment created: ${comment._id}`);

    return comment.populate('userId');
  }

  public async findByOfferId (offerId: string): Promise<Nullable<DocumentType<CommentEntity>>[]> {
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
