import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  AuthorCheckMiddleware,
  BaseController, DocumentExistsMiddleware,
  HttpError,
  HttpMethod, PrivateRouteMiddleware,
  ValidateDTOMiddleware,
  ValidateObjectIdMiddleware, ValidatePathDTOMiddleware
} from '../../libs/rest/index.js';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { CityName, COMPONENT_MAP } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRDO } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { CommentService } from '../comment/index.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { ShortOfferRDO } from './rdo/short-offer.rdo.js';
import { ParamCity } from './type/param-city.type.js';
import { PremiumDTO } from './dto/premium.dto.js';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.COMMENT_SERVICE) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDTOMiddleware(CreateOfferDTO)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDTOMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new AuthorCheckMiddleware(this.offerService),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new AuthorCheckMiddleware(this.offerService),
      ]
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.showPremium,
      middlewares: [
        new ValidatePathDTOMiddleware(PremiumDTO, 'city'),
      ],
    });

  }

  public async index({ query, tokenPayload }: Request, res: Response): Promise<void> {
    const count = Number.parseInt(query.count as string, 10);
    const offers = await this.offerService.find(count, tokenPayload?.id);

    if (!offers.length) {
      throw new HttpError(
        StatusCodes.OK,
        'The offers was not found.',
        'OfferController',
      );
    }

    this.ok(res, fillDTO(ShortOfferRDO, offers));
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });
    this.created(res, fillDTO(OfferRDO, result));
  }

  public async show({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId, tokenPayload?.id);

    this.ok(res, fillDTO(OfferRDO, offer));
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDTO>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRDO, updatedOffer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async showPremium({ params, tokenPayload }: Request<ParamCity>, res: Response): Promise<void> {
    const city = params.city as CityName;
    const result = await this.offerService.findPremium(city, tokenPayload?.id);

    if (!result.length) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `No premium offers in: ${city}`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(ShortOfferRDO, result));
  }
}
