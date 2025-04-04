import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';

import { AuthService } from './auth-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { LoginUserDTO, UserEntity, UserService } from '../user/index.js';
import { TokenPayload } from './types/token-payload.type.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UserNotFoundException, UserPasswordIncorrectException } from './errors/index.js';
import { COMPONENT_MAP } from '../../types/index.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.USER_SERVICE) private readonly userService: UserService,
    @inject(COMPONENT_MAP.CONFIG) private readonly config: Config<RestSchema>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: this.config.get('JWT_ALGORITHM') })
      .setIssuedAt()
      .setExpirationTime(this.config.get('JWT_EXPIRED'))
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDTO): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
