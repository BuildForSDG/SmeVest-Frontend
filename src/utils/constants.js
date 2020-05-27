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
