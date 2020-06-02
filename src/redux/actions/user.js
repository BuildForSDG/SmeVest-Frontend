import userTypes from '../types/user';
import { createProfileApi, getProfileApi } from '../../utils/api';

export const createProfileStart = () => ({
  type: userTypes.PROFILE_START,
});

export const createProfileSuccess = (userData) => ({
  type: userTypes.CREATE_PROFILE_SUCCESS,
  payload: userData,
});

export const createProfileFail = (error) => ({
  type: userTypes.PROFILE_FAIL,
  payload: { error },
});

export const getProfileStart = () => ({
  type: userTypes.PROFILE_START,
});

export const getProfileFail = (error) => ({
  type: userTypes.PROFILE_FAIL,
  payload: { error },
});

export const getProfileSuccess = (userData) => ({
  type: userTypes.FETCH_PROFILE_SUCCESS,
  payload: userData,
});

export const createUserProfile = (formData) => async (dispatch) => {
  dispatch(createProfileStart());
  try {
    const { status, data } = await createProfileApi(formData);
    if (status === 201) {
      dispatch(createProfileSuccess(data));
      return true;
    }
    dispatch(createProfileFail({ network: 'Profile exist' }));
    return false;
  } catch (error) {
    dispatch(createProfileFail({ network: 'Network Error' }));
    return false;
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch(getProfileStart());
  try {
    const res = await getProfileApi();
    if (res.status === 200) {
      dispatch(getProfileSuccess(res.data));
      return true;
    }
    dispatch(getProfileFail({ network: 'No profile yet, please update your profile' }));
    return false;
  } catch (error) {
    dispatch(getProfileFail({ network: 'Error fetching profile details or profile not updated' }));
    return false;
  }
};
