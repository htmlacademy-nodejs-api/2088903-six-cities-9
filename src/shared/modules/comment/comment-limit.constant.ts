export const COMMENT_LIMIT = {
  MAX_COMMENT_COUNT: 50,
  TEXT: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 1024
  },
  RATING: {
    MIN: 1,
    MAX: 5,
  },
} as const;
