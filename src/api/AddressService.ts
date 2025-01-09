import { getRequest } from '@/utils/abstractApi';

export const getAddressData = async () => {
  try {
    const result = await getRequest('/data/addressData.json');
    return result || [];
  } catch (error) {
    console.error('Error fetching address data:', error);
    return;
  }
};
