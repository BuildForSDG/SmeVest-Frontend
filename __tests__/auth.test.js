import authReducer from '../src/redux/reducers/auth';
import authTypes from '../src/redux/types/auth';
import * as authActions from '../src/redux/actions/auth';

describe('auth reducer - sign up', () => {
  let state;
  beforeEach(() => {
    state = {
      token: '',
      userId: '',
      email: '',
      isVerified: false,
      emailConfirmCode: '',
      error: null,
      loading: false,
      message: '',
    };
  });
  test('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(state);
  });

  test('should store token upon sign up', () => {
    expect(
      authReducer(state, {
        type: authTypes.SIGN_UP_SUCCESS,
        payload: {
          token: 'some-token',
          userId: 'some-user-id',
          isVerified: false,
          emailConfirmCode: 'verification-code',
          message: 'user created',
          email: 'test@test.com',
        },
      }),
    ).toEqual({
      ...state,
      token: 'some-token',
      userId: 'some-user-id',
      isVerified: false,
      emailConfirmCode: 'verification-code',
      message: 'user created',
      email: 'test@test.com',
    });
  });

  test('should handle AUTH_START action', () => {
    expect(authReducer(state, { type: authTypes.AUTH_START })).toEqual({ ...state, loading: true });
  });

  test('should handle AUTH_FAIL action', () => {
    expect(authReducer(state, { type: authTypes.AUTH_FAIL, payload: { error: 'some-error' } })).toEqual({
      ...state,
      loading: false,
      error: 'some-error',
    });
  });
});

describe('auth actions - signup', () => {
  test('should create an action to sign up user', () => {
    const user = {
      token: 'some-token',
      _id: 'xcx34ccx',
      emailConfirmCode: 'code',
      isVerified: false,
      message: 'some-message',
      email: 'user@user.com',
    };
    const expectOutput = {
      type: authTypes.SIGN_UP_SUCCESS,
      payload: {
        token: 'some-token',
        userId: 'xcx34ccx',
        emailConfirmCode: 'code',
        isVerified: false,
        message: 'some-message',
        email: 'user@user.com',
      },
    };

    expect(authActions.onSignUpSuccess(user)).toEqual(expectOutput);
  });

  test('should create an action for auth fail', () => {
    expect(authActions.authFail({ network: 'Network Error' })).toEqual({
      type: authTypes.AUTH_FAIL,
      payload: { error: { network: 'Network Error' } },
    });
  });

  test('should create an action for auth start', () => {
    expect(authActions.authStart()).toEqual({
      type: authTypes.AUTH_START,
    });
  });
});
