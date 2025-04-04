import { UserType } from '../../../types/index.js';
import { USER_VALIDATION_MESSAGE } from './user-validation.messages.js';
import {IsEmail, IsEnum, IsOptional, IsUrl, MaxLength, MinLength} from 'class-validator';
import { USER } from '../user.constant.js';

export class CreateUserDTO {
  @MinLength(USER.NAME.MIN_LENGTH, { message: USER_VALIDATION_MESSAGE.NAME.MAX_LENGTH })
  @MaxLength(USER.NAME.MAX_LENGTH, { message: USER_VALIDATION_MESSAGE.NAME.MAX_LENGTH })
  public name: string;

  @IsEmail({}, { message: USER_VALIDATION_MESSAGE.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsOptional()
  @IsUrl({}, { message: USER_VALIDATION_MESSAGE.AVATAR.INVALID_FORMAT })
  public avatar: string;

  @MinLength(USER.PASSWORD.MIN_LENGTH, { message: USER_VALIDATION_MESSAGE.PASSWORD.MIN_LENGTH })
  @MaxLength(USER.PASSWORD.MAX_LENGTH, { message: USER_VALIDATION_MESSAGE.PASSWORD.MAX_LENGTH })
  public password: string;

  @IsEnum(UserType, { message: USER_VALIDATION_MESSAGE.TYPE.INVALID_FORMAT })
  public type: UserType;
}
