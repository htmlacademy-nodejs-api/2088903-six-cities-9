import { Expose } from 'class-transformer';
import { UserType } from '../../../types/index.js';

export class UserRDO {
  @Expose()
    id!: string;

  @Expose()
    name!: string;

  @Expose()
    email!: string;

  @Expose()
    avatar!: string;

  @Expose()
    type!: UserType;
}
