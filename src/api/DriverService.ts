import type { DriverListResponse } from '@/interfaces/API/DriverServiceInterface';
import { deleteRequest, getRequest, postRequest } from '@/utils/requestFunctions';

export const getDriverDetailData = async (driverId: string) => {
  try {
    const res = await getRequest(`/drivers/${driverId}`);
    return res;
  } catch (error) {
    console.error(`Error fetching driver detail for driverId: ${driverId}`, error);
    throw new Error(`Failed to fetch driver details for driverId: ${driverId}. Please try again later.`);
  }
};

export const getDriverReviewData = async (driverId: string, page: number, itemsPerPage: number) => {
  try {
    const res = await getRequest(`/reviews/${driverId}?page=${page}&pageSize=${itemsPerPage}`);
    return res;
  } catch (error) {
    console.error(`Error fetching reviews for driverId: ${driverId}, page: ${page}, pageSize: ${itemsPerPage}`, error);
    throw new Error(`Failed to fetch reviews for driverId: ${driverId}. Please try again later.`);
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

export const getDibDriver = async (driverId: string) => {
  try {
    const res = await getRequest(`/drivers/${driverId}/like`);
    return res;
  } catch (error) {
    console.error(`Failed to fetch dib status for driverId: ${driverId}`, error);
    throw new Error('Failed to fetch dib status. Please try again later.');
  }
};

export const postDibDriver = async (driverId: string) => {
  try {
    const res = await postRequest(`/drivers/${driverId}/like`);
    return res;
  } catch (error) {
    console.error(`Failed to add dib for driverId: ${driverId}`, error);
    throw new Error('Failed to add dib. Please try again later.');
  }
};

export const delDibDriver = async (driverId: string) => {
  try {
    const res = await deleteRequest(`/drivers/${driverId}/like`);
    return res;
  } catch (error) {
    console.error(`Failed to remove dib for driverId: ${driverId}`, error);
    throw new Error('Failed to remove dib. Please try again later.');
  }
};
