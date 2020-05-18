export const checkValidity = (value, rules, state) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.email) {
    isValid = value.trim().match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) && isValid;
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }

  if (rules.match) {
    isValid = value.trim() === state[rules.match].value && isValid;
  }

  return isValid;
};

export const isFormValidCheck = (state) => {
  const fields = Object.values(state);
  const filtered = fields.filter((field) => Object.prototype.hasOwnProperty.call(field, 'valid'));

  let isFormValid = true;
  isFormValid = filtered.every((field) => field.valid && isFormValid);

  return isFormValid;
};

export const checkError = (field) => {
  if (field.touched) {
    if (field.valid) {
      return 'is-valid';
    }
    return 'is-invalid';
  }
  return '';
};

export const checkServerEmailError = (error) => error && error.email;
export const checkServerNetworkError = (error) => error && error.network;
export const checkServerVerifyError = (error) => error && error.unverified;
