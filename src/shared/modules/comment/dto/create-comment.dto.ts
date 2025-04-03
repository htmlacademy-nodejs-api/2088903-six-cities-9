import { COMMENT_LIMIT } from '../comment-limit.constant.js';
import { IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { COMMENT_VALIDATION_MESSAGES } from './comment-validation.messages.js';

export class CreateCommentDto {
  @MinLength(COMMENT_LIMIT.TEXT.MIN_LENGTH, { message: COMMENT_VALIDATION_MESSAGES.TEXT.MIN_LENGTH })
  @MaxLength(COMMENT_LIMIT.TEXT.MAX_LENGTH, { message: COMMENT_VALIDATION_MESSAGES.TEXT.MAX_LENGTH })
  public comment: string;

  @IsMongoId({ message: COMMENT_VALIDATION_MESSAGES.OFFER_ID.INVALID_ID })
  public offerId: string;

  @IsMongoId({ message: COMMENT_VALIDATION_MESSAGES.USER_ID.INVALID_ID })
  public userId: string;

  @IsInt({ message: COMMENT_VALIDATION_MESSAGES.RATING.INVALID_FORMAT })
  @Min(COMMENT_LIMIT.RATING.MIN, { message: COMMENT_VALIDATION_MESSAGES.RATING.MIN_VALUE })
  @Max(COMMENT_LIMIT.RATING.MAX, { message: COMMENT_VALIDATION_MESSAGES.RATING.MAX_VALUE})
  public rating: number;
}
