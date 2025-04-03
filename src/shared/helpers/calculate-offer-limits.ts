import { OFFER_LIMIT } from '../modules/offer/index.js';

export const calculateOfferLimits = (requestedCount?: number): number => {
  if (!requestedCount) {
    return OFFER_LIMIT.COUNT.DEFAULT;
  }

  return Math.min(requestedCount, OFFER_LIMIT.COUNT.MAX);
};
