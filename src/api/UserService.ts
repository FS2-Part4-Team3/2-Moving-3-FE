import { UserUpdates } from '@/interfaces/API/UserServiceInterface';
import { getRequest, patchRequest, postRequest, putRequest } from '@/utils/requestFunctions';

export const postSignInData = async (userType: string, email: string, password: string) => {
  const params = {
    email: email,
    password: password,
  };
  try {
    const data = await postRequest(`/auth/signIn/${userType}`, params);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const postSignUpData = async (userType: string, email: string, name: string, phoneNumber: string, password: string) => {
  const params = {
    email: email,
    name: name,
    phoneNumber: phoneNumber,
    password: password,
  };
  try {
    const data = await postRequest(`/auth/signUp/${userType}`, params);
    return data;
  } catch (error) {
    console.error('SignUp Fetch error:', error);
    throw error;
  }
};

export const patchUserData = async (imgUrl: string, serviceType: string[], areas: string[]) => {
  try {
    const requestBody: any = { serviceType, areas };
    if (imgUrl) {
      requestBody.image = imgUrl;
    }

    const res = await patchRequest('/users/update', requestBody);
    return res || [];
  } catch (err) {
    console.error('Error patching user data: ', err);
    return;
  }
};

export const editUserData = async (
  imgUrl: string,
  serviceType: string[],
  areas: string[],
  name: string,
  email: string,
  phoneNumber: string,
) => {
  try {
    const requestBody: any = { serviceType, areas, name, email, phoneNumber };
    if (imgUrl) {
      requestBody.image = imgUrl;
    }

    const res = await patchRequest('/users/update', requestBody);
    return res || [];
  } catch (err) {
    console.error('Error patching user data: ', err);
    return;
  }
};

export const patchDriverData = async (
  imgUrl: string,
  nickname: string,
  startAt: Date,
  introduce: string,
  description: string,
  serviceType: string[],
  availableAreas: string[],
) => {
  try {
    const requestBody: any = { nickname, startAt, introduce, description, serviceType, availableAreas };
    if (imgUrl) {
      requestBody.image = imgUrl;
    }

    const res = await patchRequest('/drivers/update', requestBody);
    return res || [];
  } catch (err) {
    console.error('Error patching driver data ', err);
    return;
  }
};

export const getUserData = async () => {
  try {
    const res = await getRequest('/auth/me');
    return res || [];
  } catch (err) {
    console.error('Error fetching user data: ', err);
    return;
  }
};

export const putImage = async (url: string, imageFile: Blob | File) => {
  try {
    if (!(imageFile instanceof File || imageFile instanceof Blob)) {
      throw new Error('유효하지 않은 이미지 파일입니다.');
    }
    const res = await putRequest(url, imageFile);
    const text = await res.text();
    return text;
  } catch (err) {
    console.error('putImage 함수에서 발생한 에러:', err);
    throw new Error();
  }
};

export const patchPassword = async (oldPw: string, NewPw: string) => {
  try {
    const requestBody = { oldPw, NewPw };
    const res = await patchRequest('/auth/password', requestBody);
    return res || [];
  } catch (err) {
    console.error('Error patching password data ', err);
    return;
  }
};
