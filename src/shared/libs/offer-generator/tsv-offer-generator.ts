import dayjs from 'dayjs';

import { City, MockServerData } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../helpers/index.js';

const Weekday = {
  FIRST: 1,
  LAST: 7
} as const;

const Rating = {
  MIN: 1,
  MAX: 5
} as const;

const Bedrooms = {
  MIN: 1,
  MAX: 8
} as const;

const MaxAdults = {
  MIN: 1,
  MAX: 10
} as const;

const Price = {
  MIN: 100,
  MAX: 1000
} as const;

const Comments = {
  MIN: 0,
  MAX: 10
} as const;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<City>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.previewImages).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(Rating.MIN, Rating.MAX, 1);
    const accommodation = getRandomItem(this.mockData.accommodations);
    const rooms = generateRandomValue(Bedrooms.MIN, Bedrooms.MAX);
    const guests = generateRandomValue(MaxAdults.MIN, MaxAdults.MAX);
    const price = generateRandomValue(Price.MIN, Price.MAX).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities).join(';');
    const comments = generateRandomValue(Comments.MIN, Comments.MAX);
    const hostNames = getRandomItem(this.mockData.hostNames);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem(this.mockData.userTypes);

    const date = dayjs()
      .subtract(generateRandomValue(Weekday.FIRST, Weekday.LAST), 'day')
      .toISOString();

    const host = [hostNames, email, avatar, userType].join(';');
    const location = [city.location.latitude, city.location.longitude].join(';');

    return [
      title,
      description,
      date,
      city.name,
      preview,
      images,
      isPremium,
      isFavorite,
      rating,
      accommodation,
      rooms,
      guests,
      price,
      amenities,
      host,
      comments,
      location,
    ].join('\t');
  }
}
