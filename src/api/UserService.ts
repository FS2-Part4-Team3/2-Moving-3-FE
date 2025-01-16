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

export const patchUserData = async (imgUrl: string, serviceTypes: string[], areas: string[]) => {
  try {
    const requestBody: any = { serviceTypes, areas };
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
    return res || [];
  } catch (err) {
    throw new Error();
  }
};
