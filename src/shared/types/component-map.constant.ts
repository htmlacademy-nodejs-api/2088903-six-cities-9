export const COMPONENT_MAP = {
  REST_APPLICATION: Symbol('RestApplication'),
  LOGGER: Symbol('Logger'),
  CONFIG: Symbol('Config'),
  DATABASE_CLIENT: Symbol('DatabaseClient'),
  USER_SERVICE: Symbol('UserService'),
  USER_MODEL: Symbol('UserModel'),
  OFFER_SERVICE: Symbol('OfferService'),
  OFFER_MODEL: Symbol('OfferModel'),
  COMMENT_SERVICE: Symbol('CommentService'),
  COMMENT_MODEL: Symbol('CommentModel'),
} as const;
