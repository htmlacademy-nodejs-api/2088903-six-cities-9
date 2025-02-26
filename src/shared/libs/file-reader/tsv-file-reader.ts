import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/index.js';
import { CityType } from '../../types/city-type.enum.js';
import { AccommodationType } from '../../types/accommodation-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';

import {COMMA, DECIMAL, NEWLINE, TAB} from '../../../const.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read () {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray (): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }

  private validateRawData (): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split(NEWLINE)
      .filter((row) => row.trim().length)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      city,
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
      userName,
      email,
      avatar,
      password,
      userType,
      commentsCount,
      location,
    ] = line.split(TAB);

    return {
      title,
      description,
      date: new Date(createdDate),
      city: CityType[city as 'Paris'| 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
      preview,
      images: this.parseToArray(images),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseToNum(rating),
      accommodation: AccommodationType[accommodation as 'apartment' | 'house' | 'room' | 'hotel'],
      rooms: this.parseToNum(rooms),
      guests: this.parseToNum(guests),
      price: this.parseToNum(price),
      amenities: this.parseToArray(amenities),
      host: {
        email,
        name: userName,
        avatar,
        password,
        type: this.parseUserType(userType),
      },
      commentsCount: this.parseToNum(commentsCount),
      location: {
        latitude: Number(this.parseToArray(location)[0]),
        longitude: Number(this.parseToArray(location)[1]),
      },
    };
  }

  private parseBoolean(string: string): boolean {
    return string === 'true';
  }

  private parseUserType(string: string): UserType {
    return string === UserType.Pro ? UserType.Pro : UserType.Regular;
  }

  private parseToArray<T> (string: string): T[] {
    return string.split(COMMA).map((name) => name as T);
  }

  private parseToNum (dataString: string): number {
    return Number.parseInt(dataString, DECIMAL);
  }
}
