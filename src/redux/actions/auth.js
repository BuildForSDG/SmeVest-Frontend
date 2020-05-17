import { authTypes } from '../types';
import { signUpApi } from '../../utils/api';

export const authStart = () => ({
  type: authTypes.AUTH_START,
});

export const onSignUpSuccess = ({
  token, _id, emailConfirmCode, isVerified, message, email,
}) => ({
  type: authTypes.SIGN_UP_SUCCESS,
  payload: {
    token,
    userId: _id,
    isVerified,
    emailConfirmCode,
    message,
    email,
  },
});

export const authFail = (error) => ({
  type: authTypes.AUTH_FAIL,
  payload: { error },
});

export const onSignUp = ({ email, password, role }) => async (dispatch) => {
  dispatch(authStart());
  const user = { email, password, role };
  try {
    const userData = await signUpApi(user);

    if (userData.status === 201) {
      const {
        token,
        message,
        data: { _id, emailConfirmCode, isVerified },
      } = userData;
      dispatch(
        onSignUpSuccess({
          token,
          _id,
          emailConfirmCode,
          isVerified,
          message,
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
