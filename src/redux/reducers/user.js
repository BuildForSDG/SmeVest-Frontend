import userTypes from '../types/user';

const INITIAL_STATE = {
  userData: null,
  loading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.PROFILE_START:
      return { ...state, loading: true, error: null };
    case userTypes.CREATE_PROFILE_SUCCESS:
    case userTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state, loading: false, error: null, userData: action.payload,
      };
    case userTypes.PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default userReducer;
