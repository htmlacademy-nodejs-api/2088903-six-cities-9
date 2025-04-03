export const OFFER_LIMIT = {
  COUNT: {
    DEFAULT: 60,
    PREMIUM: 3,
    IMAGES: 6,
    MIN: 1,
    MAX: 100,
  },
  TITLE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 100
  },
  DESCRIPTION: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 1024
  },
  ROOMS: {
    MIN: 1,
    MAX: 8,
  },
  GUESTS: {
    MIN: 1,
    MAX: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 100000,
  },
  RATING: {
    MIN: 1,
    MAX: 5,
    DECIMAL_PLACE: 1,
  },
} as const;
