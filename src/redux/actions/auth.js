import { authTypes } from '../types';
import { signUpApi, signInApi } from '../../utils/api';

export const authStart = () => ({
  type: authTypes.AUTH_START,
});

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

export const verifyAccountStart = ({ emailConfirmCode, email }) => ({
  type: authTypes.VERIFY_ACCOUNT_START,
  payload: {
    emailConfirmCode,
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
          _id, emailConfirmCode, isVerified, role, token,
        },
      } = userData;

      if (isVerified) {
        // If account has been verified, store the userId, token and role in the localstorage
        localStorage.setItem('userId', _id);
        localStorage.setItem('AUTH_TOKEN', token);
        localStorage.setItem('role', role);
        dispatch(onSignInSuccess({ _id, token, role }));
        return true;
      }
      // Unverified account
      dispatch(verifyAccountStart({ emailConfirmCode, email }));
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

export const signOutStart = () => ({ type: authTypes.SIGN_OUT_USER });

export const signOut = () => (dispatch) => {
  localStorage.removeItem('AUTH_TOKEN');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  dispatch(signOutStart());
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  const id = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  if (!token) {
    dispatch(signOut());
  } else {
    dispatch(onSignInSuccess({ _id: id, token, role }));
  }
};
