import { postRequest } from '@/utils/requestFunctions';

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
