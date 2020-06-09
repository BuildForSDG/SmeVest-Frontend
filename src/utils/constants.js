let THE_END_POINT;

switch (process.env.NODE_ENV) {
  case 'staging':
    THE_END_POINT = process.env.STAGING_API_ENDPOINT;
    break;
  case 'production':
    THE_END_POINT = process.env.STAGING_API_ENDPOINT;
    break;
  default:
    THE_END_POINT = process.env.DEVEVLOPMENT_API_ENDPOINT || 'http://localhost:5000/api/v1';
}

export const API_END_POINT = THE_END_POINT;
export const COUNTRY_API_GET_ACCESS_TOKEN = 'https://www.universal-tutorial.com/api/getaccesstoken';
export const COUNTRY_API = 'https://www.universal-tutorial.com/api';
export const COUNTRY_API_TOKEN = 'EufMgIWKPBjwwV6_P9qUBpJmsoVl1cjhIW6iAtSmbnw4J4o0oIfWnAeeVysITwU-d_g';
export const COUNTRY_API_EMAIL = 'yasholma1@gmail.com';
export const ACCESS_TOKEN = 'access_token';
export const USER_ID = 'userId';
export const ROLE = 'role';
