import { API_END_POINT, AUTH_TOKEN } from './constants';

const requests = async (url, options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  // check if token exist on local storage
  if (localStorage.getItem(AUTH_TOKEN)) {
    headers.append('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
  }

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
