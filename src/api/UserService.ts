import { getRequest, patchRequest } from '@/utils/requestFunctions';

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
