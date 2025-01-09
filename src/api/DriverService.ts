import { getRequest } from '@/utils/requestFunctions';

export const getDriverData = async () => {
  try {
    const result = await getRequest('/data/driversData.json');
    return result || [];
  } catch (error) {
    console.error('Error fetching driver data:', error);
    return;
  }
};

export const getDriverDetailData = async (driverId: string) => {
  try {
    const response = await getRequest(`/data/driversDetail/driversDetailData.json`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDriverReviewData = async (driverId: string) => {
  try {
    const response = await getRequest(`/data/driversDetail/driversReviewData.json`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMoveInfoData = async () => {
  try {
    const result = await getRequest('/data/moveInfosData.json');
    return result || [];
  } catch (error) {
    console.error('Error fetching user data:', error);
    return;
  }
};
