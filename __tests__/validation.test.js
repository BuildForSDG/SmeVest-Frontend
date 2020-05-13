import { checkValidity, isFormValidCheck } from '../src/utils/validation';

describe('Form Validation', () => {
  test('checkValidity should return true if value passes validation', () => {
    const state = {
      email: {
        value: '',
        valid: false,
        validation: {
          required: true,
          email: true,
        },
        touched: false,
      },
    };

    const value = 'test@test.com';

    expect(checkValidity(value, state.email.validation, state)).toBeTruthy();
  });

  test('checkValidity should return false if value fails validation', () => {
    const state = {
      email: {
        value: '',
        valid: false,
        validation: {
          required: true,
          email: true,
        },
        touched: false,
      },
    };

    const value = 'testtest.com';

    expect(checkValidity(value, state.email.validation, state)).toBeFalsy();
  });

  test('isFormValidCheck should return isFormValid to be true if all input field valid property is true', () => {
    const state = {
      email: {
        value: '',
        valid: true,
      },
      password: {
        value: '',
        valid: true,
      },
    };

    expect(isFormValidCheck(state)).toBeTruthy();
  });

  test('isFormValidCheck should return isFormValid to be false if any input field valid property is false', () => {
    const state = {
      email: {
        value: '',
        valid: true,
      },
      password: {
        value: '',
        valid: false,
      },
    };

    expect(isFormValidCheck(state)).toBeFalsy();
  });
});
