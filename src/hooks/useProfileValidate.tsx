'use client';

import { useState } from 'react';
import type { Errors, RegisterDriverValues, ValidateProps } from '@/interfaces/Page/ProfileRegisterDriverInterface';

export default function useProfileValidate(initialValues?: Partial<RegisterDriverValues>) {
  const [values, setValues] = useState<RegisterDriverValues>({
    nickname: '',
    career: new Date(),
    shortBio: '',
    description: '',
    selectedRegions: [],
    selectedMovingType: [],
    name: '',
    email: '',
    number: '',
    nowPassword: '',
    newPassword: '',
    newPasswordChk: '',
    ...initialValues,
  });
  const [errors, setErrors] = useState<Errors>({});

  const validate = (type: ValidateProps['type']) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex =
      /^(010\d{4}\d{4}|02\d{4}\d{4}|032\d{4}\d{4}|042\d{4}\d{4}|051\d{4}\d{4}|052\d{4}\d{4}|053\d{4}\d{4}|062\d{4}\d{4}|064\d{4}\d{4}|031\d{4}\d{4}|033\d{4}\d{4}|041\d{4}\d{4}|043\d{4}\d{4}|054\d{4}\d{4}|055\d{4}\d{4}|061\d{4}\d{4}|063\d{4}\d{4})$/;
    let isValid = true;
    let isEditNormalValid = true;
    let newError: Errors = {};

    if (!values.nickname?.trim()) {
      isValid = false;
      newError.nickname = '성함을 입력해주세요.';
    }

    if (!values.career) {
      isValid = false;
      newError.career = '경력 시작일을 입력해주세요.';
    }

    if (!values.shortBio?.trim() || values.shortBio.length < 8) {
      isValid = false;
      newError.shortBio = '8자 이상 입력해주세요.';
    }

    if (!values.description?.trim() || values.description.length < 10) {
      isValid = false;
      newError.description = '10자 이상 입력해주세요.';
    }

    if (!values.selectedRegions) {
      isValid = false;
      newError.selectedRegion = '* 1개 이상 선택해주세요.';
    }

    if (!values.selectedMovingType) {
      isValid = false;
      newError.selectedMovingType = '* 1개 이상 선택해주세요.';
    }

    if (!values.name) {
      isEditNormalValid = false;
      newError.name = '이름을 입력해주세요.';
    }

    if (!values.email || !emailRegex.test(values.email)) {
      isEditNormalValid = false;
      newError.email = '이메일 형식이 아닙니다.';
    }

    if (!values.number || !numberRegex.test(values.number)) {
      isEditNormalValid = false;
      newError.number = '핸드폰 번호 및 숫자만 입력해주세요.';
    }

    if (!values.nowPassword.trim() || !passwordRegex.test(values.nowPassword)) {
      isEditNormalValid = false;
      newError.nowPassword = '최소 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (!values.newPassword.trim() || !passwordRegex.test(values.newPassword)) {
      isEditNormalValid = false;
      newError.newPassword = '최소 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (!values.newPasswordChk.trim() || !(values.newPasswordChk === values.newPassword)) {
      isEditNormalValid = false;
      newError.newPasswordChk = '새 비밀번호가 일치하지 않습니다.';
    }

    setErrors(newError);
    return type === 'REGISTER' ? isValid : isEditNormalValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    values,
    setValues,
    errors,
    validate,
    handleChange,
  };
}
