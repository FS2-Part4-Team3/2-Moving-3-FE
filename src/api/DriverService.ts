import type { DriverListResponse } from '@/interfaces/API/DriverServiceInterface';
import { deleteRequest, getRequest, postRequest } from '@/utils/requestFunctions';

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
    const res = await getRequest(`/drivers/${driverId}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDriverReviewData = async (driverId: string, page: number, itemsPerPage: number) => {
  try {
    const res = await getRequest(`/reviews/${driverId}?page=${page}&pageSize=${itemsPerPage}`);
    return res;
  } catch (error) {
    console.log(error);
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

export const getDibsDriverListData = async (page: number, pageSize: number) => {
  const params = {
    page: page,
    pageSize: pageSize,
  };

  try {
    const data = await getRequest('/drivers/like', params);
    console.log(data);
    return data;
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

export const postDibDriver = async (driverId: string) => {
  try {
    const res = await postRequest(`/drivers/${driverId}/like`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const delDibDriver = async (driverId: string) => {
  try {
    const res = await deleteRequest(`/drivers/${driverId}/like`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
