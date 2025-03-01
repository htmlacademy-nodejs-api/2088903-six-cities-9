import { CityName } from './city-name.enum.js';
import { Amenities } from './amenities.enum.js';
import { Location } from './location.type.js';
import { Accommodation } from './accommodation.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: CityName;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  accommodation: Accommodation,
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenities[];
  host: User;
  commentsCount: number;
  location: Location;
}
