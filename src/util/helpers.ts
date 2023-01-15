export const isAllNumbers = (str: string) => /^\d+$/.test(str);

export const checkIsOtp = (str: string, otpLength: number) =>
  str && isAllNumbers(str) && str.length === otpLength;
