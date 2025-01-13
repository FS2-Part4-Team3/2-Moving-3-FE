import type { RegisterDriverValues } from './ProfileRegisterDriverInterface';

export interface ProfileEditNormlProps {
  values: RegisterDriverValues;
  errors: {
    name?: string;
    email?: string;
    number?: string;
    nowPassword?: string;
    newPassword?: string;
    newPasswordChk?: string;
  };
  isTouched: IsTouched;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleInputBlur: (field: keyof IsTouched) => void;
}

export interface IsTouched {
  name: boolean;
  number: boolean;
  email: boolean;
  nowPassword: boolean;
  newPassword: boolean;
  newPasswordChk: boolean;
}
