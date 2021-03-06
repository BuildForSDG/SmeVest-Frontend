import { authTypes } from '../types';
import {
  signUpApi,
  signInApi,
  verifyAccountApi,
  resendVerifyCodeApi,
  requestPasswordResetLinkApi,
  resetPasswordApi,
} from '../../utils/api';
import { ACCESS_TOKEN, USER_ID, ROLE } from '../../utils/constants';

export const authStart = () => ({
  type: authTypes.AUTH_START,
});

export const signOutStart = () => ({ type: authTypes.SIGN_OUT_USER });

export const onSignUpSuccess = ({
  token, _id, emailConfirmCode, email,
}) => ({
  type: authTypes.SIGN_UP_SUCCESS,
  payload: {
    token,
    userId: _id,
    emailConfirmCode,
    email,
  },
});

export const onSignInSuccess = ({ _id, token, role }) => ({
  type: authTypes.SIGN_IN_SUCCESS,
  payload: {
    userId: _id,
    token,
    role,
  },
});

export const authFail = (error) => ({
  type: authTypes.AUTH_FAIL,
  payload: { error },
});

export const clearAuthErrors = () => ({
  type: authTypes.CLEAR_ERRORS,
});

export const verifyAccountStart = ({ email }) => ({
  type: authTypes.VERIFY_ACCOUNT_START,
  payload: {
    email,
  },
});

export const onSignIn = ({ email, password }) => async (dispatch) => {
  dispatch(authStart());
  const user = { email, password };
  try {
    const userData = await signInApi(user);

    if (userData.status === 200) {
      // Sign In Successful
      // Check if user is verified
      const {
        data: {
          _id, isVerified, role, token,
        },
      } = userData;

      if (isVerified) {
        // If account has been verified, store the userId, token and role in the localstorage
        localStorage.setItem(USER_ID, _id);
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(ROLE, role);
        dispatch(onSignInSuccess({ _id, token, role }));
        return true;
      }
    }

    if (userData.status === 403) {
      // Unverified account
      dispatch(verifyAccountStart({ email }));
      dispatch(authFail({ unverified: 'This account has not been verified' }));
      return false;
    }

    if (userData.status === 401) {
      // Check if user's password is incorrect
      dispatch(authFail({ network: 'Incorrect Credentials' }));
      return false;
    }

    // user account is not available
    dispatch(authFail({ network: 'Account does not exist. Click the Sign Up button below to create one.' }));
    return false;
  } catch (error) {
    dispatch(authFail({ network: 'Network Error' }));
    return false;
  }
};

export const onSignUp = ({ email, password, role }) => async (dispatch) => {
  dispatch(authStart());
  const user = { email, password, role };
  try {
    const userData = await signUpApi(user);

    if (userData.status === 201) {
      const {
        data: { _id, token, emailConfirmCode },
      } = userData;
      dispatch(
        onSignUpSuccess({
          _id,
          token,
          emailConfirmCode,
          email,
        }),
      );
      return true;
    }
    dispatch(authFail(userData.data.errors));
    return false;
  } catch (error) {
    dispatch(authFail({ network: 'Network Error' }));
    return false;
  }
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(ROLE);
  dispatch(signOutStart());
};

export const authCheckState = () => (dispatch) => {
  dispatch(authStart());
  const token = localStorage.getItem(ACCESS_TOKEN);
  const id = localStorage.getItem(USER_ID);
  const role = localStorage.getItem(ROLE);
  if (!token) {
    dispatch(signOut());
  } else {
    dispatch(onSignInSuccess({ _id: id, token, role }));
  }
};

export const verifyAccount = (emailCode) => async (dispatch) => {
  try {
    const userData = await verifyAccountApi({ token: emailCode });
    if (userData.status === 200) {
      dispatch({ type: authTypes.VERIFY_ACCOUNT_SUCCESS });
      return true;
    }
    dispatch(authFail({ network: 'Verification code is incorrect or has expired' }));
    return false;
  } catch (error) {
    dispatch(authFail({ network: 'Network Error' }));
    return false;
  }
};

export const resendVerifyCode = (email) => async (dispatch) => {
  dispatch(authStart());
  try {
    const res = await resendVerifyCodeApi({ email });
    if (res.status === 200) {
      dispatch(verifyAccountStart({ email }));
      dispatch({ type: authTypes.VERIFY_ACCOUNT_SUCCESS });
      return true;
    }
    dispatch(authFail({ network: 'Network Error' }));
    return false;
  } catch (error) {
    dispatch(authFail({ network: 'Network Error' }));
    return false;
  }
};

export const requestResetLink = (email) => async (dispatch) => {
  dispatch(authStart());
  try {
    const res = await requestPasswordResetLinkApi({ email });
    if (res.status === 200) {
      dispatch(verifyAccountStart({ email }));
      dispatch({ type: authTypes.VERIFY_ACCOUNT_SUCCESS });
      return true;
    }
    dispatch(authFail({ network: 'Password reset link already sent. Please, check your mail.' }));
    return false;
  } catch (error) {
    dispatch(authFail({ network: 'Network Error' }));
    return false;
  }
};

export const resetPassword = ({ email, password, token }) => async (dispatch) => {
  dispatch(authStart());
  try {
    const res = await resetPasswordApi({ email, password, token });
    if (res.status === 200) {
      dispatch(verifyAccountStart({ email }));
      dispatch({ type: authTypes.VERIFY_ACCOUNT_SUCCESS });
      return true;
    }
    dispatch(authFail({ network: res.data.errors.email }));
    return false;
  } catch (error) {
    dispatch(authFail({ network: 'Network Error' }));
    return false;
  }
};
