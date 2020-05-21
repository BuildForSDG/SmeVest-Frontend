import { authTypes } from '../types';

const INITIAL_STATE = {
  token: '',
  userId: '',
  email: '',
  isVerified: false,
  emailConfirmCode: '',
  currentUser: null,
  error: null,
  loading: false,
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
        emailConfirmCode: action.payload.emailConfirmCode,
        error: null,
        loading: false,
      };
    case authTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: {
          id: action.payload.userId,
          token: action.payload.token,
          role: action.payload.role,
        },
        error: null,
        loading: false,
      };
    case authTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          id: action.payload.userId,
          token: action.payload.token,
          role: action.payload.role,
        },
      };
    case authTypes.SIGN_OUT_USER: {
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    }
    case authTypes.VERIFY_ACCOUNT_START:
      return {
        ...state,
        loading: true,
        emailConfirmCode: action.payload.emailConfirmCode,
        email: action.payload.email,
      };
    case authTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case authTypes.CLEAR_ERRORS: {
      return { ...state, error: null };
    }
    default:
      return state;
  }
};

export default authReducer;
