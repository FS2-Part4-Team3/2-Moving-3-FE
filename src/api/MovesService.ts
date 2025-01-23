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

export const postRequestDriver = async (driverId: string) => {
  try {
    const res = await postRequest(`/requests/${driverId}`);
    return res;
  } catch (err) {
    console.error(`Failed to post a request for driverId: ${driverId}`, err);
    throw new Error('Failed to submit your request. Please try again later.');
  }
};
