import { OFFER_LIMIT } from '../offer-limit.constant.js';
import { Accommodation, Amenities } from '../../../types/index.js';

export const OFFER_VALIDATION_MESSAGE = {
  TITLE: {
    MIN_LENGTH: `minimum title length is ${OFFER_LIMIT.TITLE.MIN_LENGTH}`,
    MAX_LENGTH: `maximum title length is ${OFFER_LIMIT.TITLE.MAX_LENGTH}`,
  },
  DESCRIPTION: {
    MIN_LENGTH: `minimum description length is ${OFFER_LIMIT.DESCRIPTION.MIN_LENGTH}`,
    MAX_LENGTH: `maximum description length is ${OFFER_LIMIT.DESCRIPTION.MAX_LENGTH}`,
  },
  CITY: {
    INVALID_FORMAT: 'city must be one of Six-cities',
  },
  PREVIEW: {
    INVALID_FORMAT: 'preview must be a valid url',
  },
  IMAGES: {
    INVALID_FORMAT: 'images must be an array',
    INVALID_ARRAY_COUNT: `images must be an array of ${OFFER_LIMIT.COUNT.IMAGES} items`,
    INVALID_FORMAT_ITEM: 'each item images must be a valid url'
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'isPremium must be a boolean',
  },
  RATING: {
    MIN_VALUE: 'minimum rating is 1',
    MAX_VALUE: 'maximum rating is 5',
    INVALID_FORMAT: 'rating must be an integer',
  },
  ACCOMMODATION: {
    INVALID_FORMAT: `accommodation must be one of: ${Object.values(Accommodation).join(', ')}`
  },
  ROOMS: {
    MIN_VALUE: `minimum number of rooms is ${OFFER_LIMIT.ROOMS.MIN}`,
    MAX_VALUE: `maximum number of rooms is ${OFFER_LIMIT.ROOMS.MAX}`,
    INVALID_FORMAT: 'rooms must be an integer',
  },
  GUESTS: {
    MIN_VALUE: `minimum number of adults is ${OFFER_LIMIT.GUESTS.MIN}`,
    MAX_VALUE: `maximum number of adults is ${OFFER_LIMIT.GUESTS.MAX}`,
    INVALID_FORMAT: 'guests must be an integer',
  },
  PRICE: {
    MIN_VALUE: `minimum price is ${OFFER_LIMIT.PRICE.MIN}`,
    MAX_VALUE: `maximum price is ${OFFER_LIMIT.PRICE.MAX}`,
    INVALID_FORMAT: 'price must be an integer',
  },
  AMENITIES: {
    INVALID_FORMAT: 'amenities must be an array',
    INVALID_FORMAT_ITEM: `amenities must be one of: ${Object.values(Amenities).join(', ')}`
  },
  USER_ID: {
    INVALID_ID: 'userId must be a valid id',
  },
  COMMENT_COUNT: {
    INVALID_FORMAT: 'commentCount must be an integer',
  },
  LOCATION: {
    INVALID_FORMAT: 'location must be an object with latitude and longitude',
  },
} as const;
