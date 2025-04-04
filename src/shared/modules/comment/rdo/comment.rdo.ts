import { Expose, Type } from 'class-transformer';
import { UserRDO } from '../../user/index.js';

export class CommentRDO {
  @Expose()
  public comment!: string;

  @Expose({ name: 'createdAt'})
  public date!: Date;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserRDO)
  public user: UserRDO;
}
