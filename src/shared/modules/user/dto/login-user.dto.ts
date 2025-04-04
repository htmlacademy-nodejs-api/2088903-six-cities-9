import { USER_VALIDATION_MESSAGE } from './user-validation.messages.js';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { USER } from '../user.constant.js';

export class LoginUserDTO {
  @IsEmail({}, { message: USER_VALIDATION_MESSAGE.EMAIL.INVALID_FORMAT })
  public email: string;

  @MinLength(USER.NAME.MIN_LENGTH, { message: USER_VALIDATION_MESSAGE.PASSWORD.MIN_LENGTH })
  @MaxLength(USER.NAME.MAX_LENGTH, { message: USER_VALIDATION_MESSAGE.PASSWORD.MAX_LENGTH })
  public password: string;
}
