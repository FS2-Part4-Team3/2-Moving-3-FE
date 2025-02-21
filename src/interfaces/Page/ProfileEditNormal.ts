import type { ProfileChipProps } from '../chip/ProfileChipInterface';
import type { RegisterDriverValues } from './ProfileRegisterDriverInterface';

export interface ProfileEditNormlLeftProps {
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
  isPasswordCheck: boolean;
}

export interface ProfileEditNormlRightProps {
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImgClick: () => void;
  previewUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  chipProps: ProfileChipProps;
}

export interface IsTouched {
  name: boolean;
  number: boolean;
  email: boolean;
  nowPassword: boolean;
  newPassword: boolean;
  newPasswordChk: boolean;
}
