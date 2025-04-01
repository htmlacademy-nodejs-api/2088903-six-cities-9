import { Types } from 'mongoose';
import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { COMPONENT_MAP, Nullable } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { OfferEntity } from '../offer/index.js';


@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.USER_MODEL) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findOne({email});
  }

  public async findById (userId: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findById(userId);
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById (userId: string, dto: UpdateUserDto): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userModel
      .findById(userId)
      .populate('favoriteOffers')
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user.favoriteOffers || [];
  }

  public async addFavorite(userId: string, offerId: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: new Types.ObjectId(offerId) } },
      { new: true }
    ).exec();
  }

  public async removeFavorite(userId: string, offerId: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favorites: new Types.ObjectId(offerId) } },
      { new: true }
    ).exec();
  }
}
