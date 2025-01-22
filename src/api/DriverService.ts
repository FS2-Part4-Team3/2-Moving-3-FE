import type { DriverListResponse } from '@/interfaces/API/DriverServiceInterface';
import { getRequest } from '@/utils/requestFunctions';

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

export const getEstimationData = async () => {
  try {
    const res = await fetch('http://localhost:3000/data/estimationsData.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
