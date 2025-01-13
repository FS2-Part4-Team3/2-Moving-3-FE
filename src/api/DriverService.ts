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
    const res = await getRequest(`/data/driversDetail/driversDetailData.json`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getDriverReviewData = async (driverId: string, page: number, itemsPerPage: number) => {
  try {
    // const res = await getRequest(`/reviews/${id}?page=${page}&itemsPerPage=${itemsPerPage}`);
    const res = await getRequest(`/data/driversDetail/driversReviewData.json`);
    return res;
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

export const getEstimationData = async () => {
  try {
    const result = await getRequest('/data/estimationsData.json');
    return result || [];
  } catch (error) {
    console.error('Error fetching estimations data:', error);
    return;
  }
};
