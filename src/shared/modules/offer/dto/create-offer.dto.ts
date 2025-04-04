import { Accommodation, Amenities, CityName } from '../../../types/index.js';
import { OFFER_LIMIT } from '../offer-limit.constant.js';
import {
  ArrayMaxSize,
  ArrayMinSize, ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum, IsInt, IsMongoId, IsObject,
  IsOptional,
  IsUrl, Max,
  MaxLength, Min,
  MinLength, ValidateNested
} from 'class-validator';
import { OFFER_VALIDATION_MESSAGE } from './offer-validation.messages.js';
import { Type } from 'class-transformer';
import { LocationDTO } from './location.dto.js';

export class CreateOfferDTO {
  @MinLength(OFFER_LIMIT.TITLE.MIN_LENGTH, { message: OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(OFFER_LIMIT.TITLE.MAX_LENGTH, { message: OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title: string;

  @MinLength(OFFER_LIMIT.DESCRIPTION.MIN_LENGTH, { message: OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(OFFER_LIMIT.DESCRIPTION.MAX_LENGTH, { message: OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description: string;

  @IsEnum(CityName, { message: OFFER_VALIDATION_MESSAGE.CITY.INVALID_FORMAT })
  public city: CityName;

  @IsUrl({}, { message: OFFER_VALIDATION_MESSAGE.PREVIEW.INVALID_FORMAT })
  public preview: string;

  @IsArray({ message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT })
  @ArrayMinSize(OFFER_LIMIT.COUNT.IMAGES, { message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_ARRAY_COUNT })
  @ArrayMaxSize(OFFER_LIMIT.COUNT.IMAGES, { message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_ARRAY_COUNT })
  @IsUrl({}, { each: true, message: OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT_ITEM })
  public images: string[];

  @IsBoolean({ message: OFFER_VALIDATION_MESSAGE.IS_PREMIUM.INVALID_FORMAT })
  public isPremium: boolean;

  @IsOptional()
  public rating?: number;

  @IsEnum(Accommodation, { message: OFFER_VALIDATION_MESSAGE.ACCOMMODATION.INVALID_FORMAT })
  public accommodation: Accommodation;

  @IsInt({ message: OFFER_VALIDATION_MESSAGE.ROOMS.INVALID_FORMAT })
  @Min(OFFER_LIMIT.ROOMS.MIN, { message: OFFER_VALIDATION_MESSAGE.ROOMS.MIN_VALUE })
  @Max(OFFER_LIMIT.ROOMS.MAX, { message: OFFER_VALIDATION_MESSAGE.ROOMS.MAX_VALUE })
  public rooms: number;

  @IsInt({ message: OFFER_VALIDATION_MESSAGE.GUESTS.INVALID_FORMAT })
  @Min(OFFER_LIMIT.GUESTS.MIN, { message: OFFER_VALIDATION_MESSAGE.GUESTS.MIN_VALUE })
  @Max(OFFER_LIMIT.GUESTS.MAX, { message: OFFER_VALIDATION_MESSAGE.GUESTS.MAX_VALUE })
  public guests: number;

  @IsInt({ message: OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(OFFER_LIMIT.PRICE.MIN, { message: OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(OFFER_LIMIT.PRICE.MAX, { message: OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price: number;

  @IsArray({ message: OFFER_VALIDATION_MESSAGE.AMENITIES.INVALID_FORMAT })
  @IsEnum(Amenities, { each: true, message: OFFER_VALIDATION_MESSAGE.AMENITIES.INVALID_FORMAT_ITEM })
  @ArrayUnique<Amenities>()
  public amenities: Amenities[];

  @IsMongoId({ message: OFFER_VALIDATION_MESSAGE.USER_ID.INVALID_ID })
  public userId: string;

  @IsOptional()
  public commentsCount?: number;

  @ValidateNested()
  @IsObject({ message: OFFER_VALIDATION_MESSAGE.LOCATION.INVALID_FORMAT })
  @Type(() => LocationDTO)
  public location!: LocationDTO;
}
