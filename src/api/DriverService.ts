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

export async function getDriverDetailData(driverId: string) {
  try {
    const response = await getRequest(`/data/driversDetailData.json`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getMoveInfoData = async () => {
  try {
    const result = await getRequest('/data/moveInfosData.json');
    return result || [];
  } catch (error) {
    console.error('Error fetching user data:', error);
    return;
  }
};

export const getEstimationData = async () => {
  try {
    const result = await getRequest('/data/estimationsData.json');
    return result || [];
  } catch (error) {
    console.error('Error fetching estimations data:', error);
    return;
  }
};
