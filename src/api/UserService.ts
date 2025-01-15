import { getRequest, patchRequest, postRequest } from '@/utils/requestFunctions';

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

export const patchUserData = async (imgUrl: string, serviceTypes: string[], areas: string[]) => {
  try {
    const res = await patchRequest('/users/update', { image: imgUrl, serviceTypes: serviceTypes, areas: areas });
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
