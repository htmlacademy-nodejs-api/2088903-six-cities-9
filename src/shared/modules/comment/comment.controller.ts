import { inject, injectable } from 'inversify';
import { Response } from 'express';

import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod, PrivateRouteMiddleware,
  ValidateDTOMiddleware,
} from '../../libs/rest/index.js';
import { COMPONENT_MAP } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRDO } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.COMMENT_SERVICE) private readonly commentService: CommentService,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDTOMiddleware(CreateCommentDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const comment = await this.commentService.create({ ...body, userId: tokenPayload.id });
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRDO, comment));
  }
}
