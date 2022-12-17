export const TextHelper = {
  REQUIRED_MESSAGE: 'This field is required',
  EMAIL_ERROR_TEXT: 'Email is not valid',
  PASSWORD_ERROR_MESSAGE: 'Password is wrong',
  PASSWORD_CONFIRM_ERROR_MESSAGE: 'Passwords do not match!',
};

export const EMAIL_REG_EXP = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
