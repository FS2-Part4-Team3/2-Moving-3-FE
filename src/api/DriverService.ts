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

export const getDibsDriverListData = async () => {
  try {
    const res = await getRequest('/drivers/like');
    return res || [];
  } catch (error) {
    console.error('Fetch Dibs Driver Error', error);
    throw error;
  }
};

export const getDriverListData = async (
  page?: number,
  pageSize?: number,
  keyword?: string,
  orderBy: string = 'MostReviewed',
  area?: string,
  serviceType?: string,
): Promise<DriverListResponse> => {
  const params = {
    page: page,
    pageSize: pageSize,
    keyword: keyword,
    orderBy: orderBy,
    area: area,
    serviceType: serviceType,
  };

  try {
    const data = await getRequest('/drivers', params);
    return data;
  } catch (error) {
    console.error('Get Driver List Fetch error:', error);
    throw error;
  }
};

export const getMovesListData = async (
  page: number,
  pageSize: number,
  keyword: string | undefined,
  orderBy: string,
  serviceType: 'SMALL' | 'HOME' | 'OFFICE' | undefined,
  serviceArea: 'Active' | 'Inactive',
  designatedRequest: 'Active' | 'Inactive',
) => {
  const params = {
    page: page,
    pageSize: pageSize,
    keyword: keyword,
    orderBy: orderBy,
    serviceType: serviceType,
    serviceArea: serviceArea,
    designatedRequest: designatedRequest,
  };

  try {
    const data = await getRequest('/moves', params);
    return data;
  } catch (error) {
    console.error('Get Move List Fetch Error:', error);
    throw error;
  }
};
