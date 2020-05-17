import { authTypes } from '../types';

const INITIAL_STATE = {
  token: '',
  userId: '',
  email: '',
  isVerified: false,
  emailConfirmCode: '',
  error: null,
  loading: false,
  message: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.AUTH_START:
      return { ...state, loading: true };
    case authTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        email: action.payload.email,
        isVerified: action.payload.isVerified,
        message: action.payload.message,
        emailConfirmCode: action.payload.emailConfirmCode,
        error: null,
        loading: false,
      };
    case authTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default authReducer;
