import { ParamsDictionary } from 'express-serve-static-core';
import { CityName } from '../../../types/index.js';

export type ParamCity = {
  city: CityName;
} | ParamsDictionary;
