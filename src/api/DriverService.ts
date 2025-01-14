import type { Params } from '@/interfaces/API';
import type { DriverListResponse } from '@/interfaces/API/DriverServiceInterface';
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
    console.error('Error fetching estimate data:', error);
    return;
  }
};

export const getDriverListData = async (
  page?: number,
  pageSize?: number,
  orderBy?: string,
  keyword?: string,
): Promise<DriverListResponse> => {
  const params = {
    page: page,
    pageSize: pageSize,
    orderBy: orderBy,
    keyword: keyword,
  };

  try {
    const data = await getRequest('/drivers', params);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
