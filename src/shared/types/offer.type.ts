import { CityType } from './city-type.enum.js';
import { Amenities } from './amenities.enum.js';
import { Location } from './location.type.js';
import { AccommodationType } from './accommodation-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: CityType;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  accommodation: AccommodationType,
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenities[];
  host: User;
  commentsCount: number;
  location: Location;
}
