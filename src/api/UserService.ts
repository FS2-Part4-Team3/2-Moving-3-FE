import { patchRequest } from '@/utils/requestFunctions';

export const patchUserData = async (imgUrl: string, serviceTypes: string[], areas: string[]) => {
  try {
    const res = await patchRequest('/users/update', { image: imgUrl, serviceTypes: serviceTypes, areas: areas });
    return res || [];
  } catch (err) {
    console.error('Error fetching user data:', err);
    return;
  }
};
