import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { UserService } from './user-service.interface.js';
import { COMPONENT_MAP } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { Controller } from '../../libs/rest/index.js';
import { UserController } from './user.controller.js';


export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(COMPONENT_MAP.USER_SERVICE).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(COMPONENT_MAP.USER_MODEL).toConstantValue(UserModel);
  userContainer.bind<Controller>(COMPONENT_MAP.USER_CONTROLLER).to(UserController).inSingletonScope();

  return userContainer;
}
