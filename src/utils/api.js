import {
  API_END_POINT,
  COUNTRY_API_EMAIL,
  COUNTRY_API_TOKEN,
  COUNTRY_API_GET_ACCESS_TOKEN,
  COUNTRY_API,
  ACCESS_TOKEN,
} from './constants';

const requests = async (url, options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(ACCESS_TOKEN, localStorage.getItem(ACCESS_TOKEN));
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

const getToken = async () => {
  const req = await fetch(COUNTRY_API_GET_ACCESS_TOKEN, {
    headers: {
      Accept: 'application/json',
      'api-token': COUNTRY_API_TOKEN,
      'user-email': COUNTRY_API_EMAIL,
    },
  });

  const res = await req.json();
  return res;
};

export const signUpApi = (user) => requests(`${API_END_POINT}/auth/signup`, {
  body: JSON.stringify(user),
  method: 'POST',
});

export const signInApi = (user) => requests(`${API_END_POINT}/auth/signin`, {
  body: JSON.stringify(user),
  method: 'POST',
});

export const resetPasswordApi = ({ password, email, token }) => requests(`${API_END_POINT}/auth/passwords/reset`, {
  body: JSON.stringify({ password, email, token }),
  method: 'POST',
});

export const verifyAccountApi = (emailVerifyCode) => requests(`${API_END_POINT}/auth/emails/confirm`, {
  body: JSON.stringify(emailVerifyCode),
  method: 'POST',
});

export const resendVerifyCodeApi = (email) => requests(`${API_END_POINT}/auth/emails/confirm/resend`, {
  body: JSON.stringify(email),
  method: 'POST',
});

export const requestPasswordResetLinkApi = (email) => requests(`${API_END_POINT}/auth/passwords/forgot`, {
  body: JSON.stringify(email),
  method: 'POST',
});

export const getCountries = async () => {
  const token = await getToken();
  const req = await fetch(`${COUNTRY_API}/countries`, {
    headers: {
      Authorization: `Bearer ${token.auth_token}`,
      Accept: 'application/json',
    },
  });
  const res = await req.json();
  return res;
};

export const getStates = async (countryName) => {
  const token = await getToken();
  const req = await fetch(`${COUNTRY_API}/states/${countryName}`, {
    headers: {
      Authorization: `Bearer ${token.auth_token}`,
      Accept: 'application/json',
    },
  });
  const res = await req.json();
  return res;
};

export const getCities = async (stateName) => {
  const token = await getToken();
  const req = await fetch(`${COUNTRY_API}/cities/${stateName}`, {
    headers: {
      Authorization: `Bearer ${token.auth_token}`,
      Accept: 'application/json',
    },
  });
  const res = await req.json();
  return res;
};

export const createProfileApi = async (formData) => {
  try {
    const req = await fetch(`${API_END_POINT}/profile/create`, {
      headers: {
        ACCESS_TOKEN: localStorage.getItem(ACCESS_TOKEN),
      },
      method: 'POST',
      body: formData,
    });

    const res = await req.json();
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProfileApi = async (formData) => {
  try {
    const req = await fetch(`${API_END_POINT}/profile/update`, {
      headers: {
        ACCESS_TOKEN: localStorage.getItem(ACCESS_TOKEN),
      },
      method: 'PATCH',
      body: formData,
    });

    const res = await req.json();
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProfileApi = () => requests(`${API_END_POINT}/profile/get`, {
  method: 'GET',
});
