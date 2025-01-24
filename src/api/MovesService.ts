import { getRequest, postRequest } from '@/utils/requestFunctions';

export const getMovesListData = async (
  page: number,
  pageSize: number,
  keyword: string | undefined,
  orderBy: string,
  serviceType: string,
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

export const getCheckRequestDriver = async (driverId: string) => {
  try {
    const res = await getRequest(`/requests/check/${driverId}`);
    return res;
  } catch (err) {
    console.error(`Failed to fetch request status for driverId: ${driverId}`, err);
    throw new Error('Failed to fetch request status. Please try again later.');
  }
};

export const postRequestDriver = async (driverId: string) => {
  try {
    const res = await postRequest(`/requests/${driverId}`);
    return res;
  } catch (err) {
    console.error(`Failed to post a request for driverId: ${driverId}`, err);
    throw new Error('Failed to submit your request. Please try again later.');
  }
};

export const postMove = async (serviceType: string, date: string, fromAddress: string, toAddress: string) => {
  try {
    const requestBody = {
      serviceType,
      date,
      fromAddress,
      toAddress,
    };
    const data = await postRequest('/moves', requestBody);
    return data;
  } catch (err) {
    console.error('Post move error: ', err);
  }
};

export const getMoveCheck = async () => {
  try {
    const res = await getRequest('/moves/check');
    return res;
  } catch (err) {
    console.log('Get move check err: ', err);
  }
};
