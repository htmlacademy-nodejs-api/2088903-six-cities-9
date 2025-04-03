import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  public name?: string;
  public avatar?: string;
  public type?: UserType;
}
