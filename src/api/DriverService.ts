import { getRequest } from '@/utils/requestFunctions';

export const getDriverData = async () => {
  try {
    const res = await getRequest('/data/driversData.json');
    return res || [];
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
    const res = await getRequest('/data/moveInfosData.json');
    return res || [];
  } catch (error) {
    console.error('Error fetching user data:', error);
    return;
  }
};

export const getEstimationData = async () => {
  try {
    const res = await getRequest('/data/estimationsData.json');
    return res || [];
  } catch (error) {
    console.error('Error fetching estimation data:', error);
    return;
  }
};
