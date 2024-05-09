export interface IAuthFormData {
  username: string;
  email: string;
  password: string;
}
export type ILoginFormData = Pick<IAuthFormData, 'email' | 'password'> & { rememberMe: boolean };
export type IForgotPasswordFormData = Pick<IAuthFormData, 'email'>;
export type IResetPassword = { password: string; confirmPassword: string };
