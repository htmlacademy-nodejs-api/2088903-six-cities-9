import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class CommentRdo {
  @Expose()
  public comment!: string;

  @Expose({ name: 'createdAt'})
  public date!: Date;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
