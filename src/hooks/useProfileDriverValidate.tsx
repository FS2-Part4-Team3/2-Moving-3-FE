import type {
  Errors,
  RegisterDriverValues,
} from "@/interfaces/Page/ProfileRegisterDriverInterface";
import Error from "next/error";
import { useState } from "react";

`use client`;

export default function useProfileDriverValidate() {
  const [values, setValues] = useState<RegisterDriverValues>({
    nickname: "",
    carrer: "",
    shortBio: "",
    description: "",
    selectedRegion: null,
    selectedMovingType: null,
  });
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    let isValid = true;
    let newError: Errors = {};

    if (!values.nickname?.trim()) {
      isValid = false;
      newError.nickname = "성함을 입력해주세요.";
    }

    if (!values.carrer || isNaN(Number(values.carrer))) {
      isValid = false;
      newError.carrer = "숫자만 입력해주세요.";
    }

    if (!values.shortBio?.trim() || values.shortBio.length < 8) {
      isValid = false;
      newError.shortBio = "8자 이상 입력해주세요.";
    }

    if (!values.description?.trim() || values.description.length < 10) {
      isValid = false;
      newError.description = "10자 이상 입력해주세요.";
    }

    if (!values.selectedRegion) {
      isValid = false;
      newError.selectedRegion = "* 1개 이상 선택해주세요.";
    }

    if (!values.selectedMovingType) {
      isValid = false;
      newError.selectedMovingType = "* 1개 이상 선택해주세요.";
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
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
