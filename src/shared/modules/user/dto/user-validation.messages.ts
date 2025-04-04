import { UserType } from '../../../types/index.js';
import { USER } from '../user.constant.js';

export const USER_VALIDATION_MESSAGE = {
  NAME: {
    MIN_LENGTH: `minimum name length is ${USER.NAME.MIN_LENGTH}}`,
    MAX_LENGTH: `maximum name length is ${USER.NAME.MAX_LENGTH}`,
  },
  EMAIL: {
    INVALID_FORMAT: 'email must be a valid email address'
  },
  AVATAR: {
    INVALID_FORMAT: 'avatar must be a valid URL',
  },
  PASSWORD: {
    MIN_LENGTH: `minimum password length is ${USER.PASSWORD.MIN_LENGTH}`,
    MAX_LENGTH: `maximum password length is ${USER.PASSWORD.MAX_LENGTH}}`,
  },
  TYPE: {
    INVALID_FORMAT: `type must be an one of: ${Object.values(UserType).join(', ')}`
  },
} as const;
