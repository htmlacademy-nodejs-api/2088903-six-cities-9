import convict from 'convict';
import validator from 'convict-format-with-validator';
import { RestSchema } from './rest.schema.type.js';

convict.addFormats(validator);

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: null
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null
  },
  DB_USER: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: null,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: null
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'JWT secret',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  JWT_ALGORITHM: {
    doc: 'JWT algorithm',
    format: String,
    env: 'JWT_ALGORITHM',
    default: null
  },
  JWT_EXPIRED: {
    doc: 'JWT token expiration time',
    format: String,
    env: 'JWT_EXPIRED',
    default: null
  },
  HOST: {
    doc: 'Host where started service',
    format: String,
    env: 'HOST',
    default: null
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Path to directory with static resources',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: null
  },
});
