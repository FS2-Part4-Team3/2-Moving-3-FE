import { useState } from 'react';
import type { Errors, RegisterDriverValues } from '@/interfaces/Page/ProfileRegisterDriverInterface';

`use client`;

export default function useProfileDriverValidate() {
  const [values, setValues] = useState<RegisterDriverValues>({
    nickname: '',
    career: '',
    shortBio: '',
    description: '',
    selectedRegion: null,
    selectedMovingType: null,
    name: '',
    email: '',
    number: '',
    password: '',
    passwordChk: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex =
      /^(010\d{4}\d{4}|02\d{4}\d{4}|032\d{4}\d{4}|042\d{4}\d{4}|051\d{4}\d{4}|052\d{4}\d{4}|053\d{4}\d{4}|062\d{4}\d{4}|064\d{4}\d{4}|031\d{4}\d{4}|033\d{4}\d{4}|041\d{4}\d{4}|043\d{4}\d{4}|054\d{4}\d{4}|055\d{4}\d{4}|061\d{4}\d{4}|063\d{4}\d{4})$/;
    let isValid = true;
    let newError: Errors = {};

    if (!values.nickname?.trim()) {
      isValid = false;
      newError.nickname = '성함을 입력해주세요.';
    }

    if (!values.career || isNaN(Number(values.career))) {
      isValid = false;
      newError.career = '숫자만 입력해주세요.';
    }

    if (!values.shortBio?.trim() || values.shortBio.length < 8) {
      isValid = false;
      newError.shortBio = '8자 이상 입력해주세요.';
    }

    if (!values.description?.trim() || values.description.length < 10) {
      isValid = false;
      newError.description = '10자 이상 입력해주세요.';
    }

    if (!values.selectedRegion) {
      isValid = false;
      newError.selectedRegion = '* 1개 이상 선택해주세요.';
    }

    if (!values.selectedMovingType) {
      isValid = false;
      newError.selectedMovingType = '* 1개 이상 선택해주세요.';
    }

    if (!values.name.trim()) {
      isValid = false;
      newError.name = '이름을 입력해주세요.';
    }

    if (!values.email.trim() && emailRegex.test(values.email)) {
      isValid = false;
      newError.email = '이메일 형식이 아닙니다.';
    }

    if (!values.number.trim() && numberRegex.test(values.number)) {
      isValid = false;
      newError.number = '숫자만 입력해주세요.';
    }

    if (!values.password.trim() && !passwordRegex.test(values.password)) {
      isValid = false;
      newError.password = '최소 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (!values.passwordChk.trim() && !(values.passwordChk === values.password)) {
      isValid = false;
      newError.passwordChk = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newError);
    return isValid;
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
