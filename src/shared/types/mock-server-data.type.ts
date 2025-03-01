import { Accommodation } from './accommodation.enum.js';
import { Amenities } from './amenities.enum.js';
import { City } from './city.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  accommodations: Accommodation[];
  amenities: Amenities[];
  hostNames: string[];
  emails: string[];
  avatars: string[];
  passwords: string[];
  userTypes: string[];
};
