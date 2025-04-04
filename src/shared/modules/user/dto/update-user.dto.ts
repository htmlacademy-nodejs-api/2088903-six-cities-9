import { UserType } from '../../../types/index.js';

export class UpdateUserDTO {
  public name?: string;
  public avatar?: string;
  public type?: UserType;
}
