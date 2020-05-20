import { API_END_POINT } from './constants';

const requests = async (url, options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const metaData = { headers, ...options };

  try {
    const req = await fetch(url, metaData);
    const res = await req.json();
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signUpApi = (user) => requests(`${API_END_POINT}/auth/signup`, {
  body: JSON.stringify(user),
  method: 'POST',
});

export const signInApi = (user) => requests(`${API_END_POINT}/auth/signin`, {
  body: JSON.stringify(user),
  method: 'POST',
});

export const verifyAccountApi = (emailVerifyCode) => requests(`${API_END_POINT}/auth/emails/confirm`, {
  body: JSON.stringify(emailVerifyCode),
  method: 'POST',
});
