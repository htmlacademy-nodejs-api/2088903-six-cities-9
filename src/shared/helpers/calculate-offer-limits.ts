import { OFFER_LIMITS } from '../modules/offer/index.js';

export const calculateOfferLimits = (requestedCount?: number): number => {
  if (!requestedCount) {
    return OFFER_LIMITS.DEFAULT;
  }

  return Math.min(requestedCount, OFFER_LIMITS.MAX);
};
