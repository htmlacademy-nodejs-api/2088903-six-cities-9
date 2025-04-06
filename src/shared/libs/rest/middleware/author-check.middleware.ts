import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { AuthorCheck } from '../../../types/index.js';

export class AuthorCheckMiddleware implements Middleware {
  constructor(
    private readonly service: AuthorCheck,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!await this.service.isOfferAuthor(params.offerId, tokenPayload.id)) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'User is not the author of document',
        'AuthorCheckMiddleware'
      );
    }

    next();
  }
}
