export const COMPONENT_MAP = {
  REST_APPLICATION: Symbol('RestApplication'),
  LOGGER: Symbol('Logger'),
  CONFIG: Symbol('Config'),
  DATABASE_CLIENT: Symbol('DatabaseClient'),
  USER_SERVICE: Symbol('UserService'),
  USER_MODEL: Symbol('UserModel'),
  CATEGORY_SERVICE: Symbol('CategoryService'),
  CATEGORY_MODEL: Symbol('CategoryModel'),
  OFFER_SERVICE: Symbol('OfferService'),
  OFFER_MODEL: Symbol('OfferModel'),
} as const;
