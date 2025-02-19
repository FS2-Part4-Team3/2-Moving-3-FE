import { getRequest, patchRequest, postRequest } from '@/utils/requestFunctions';

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

export const getMovesDetailData = async (moveInfoId: string) => {
  try {
    const res = await getRequest(`/moves/${moveInfoId}`);
    return res;
  } catch (error) {
    console.error('Failed to Get Moves Detail Data', error);
    throw error;
  }
};

export const getUserMoveInfoId = async () => {
  try {
    const res = await getRequest('/moves/userMoveInfoId');
    return res;
  } catch (err) {
    console.error(`Failed to fetch UserMoveInfoId`, err);
    throw new Error('Failed to fetch UserMoveInfoId. Please try again later.');
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
    throw new Error();
  }
};

export const patchMove = async (moveId: string, serviceType: string, date: string, fromAddress: string, toAddress: string) => {
  try {
    const requestBody = {
      serviceType,
      date,
      fromAddress,
      toAddress,
    };
    const res = await patchRequest(`/moves/${moveId}`, requestBody);
    return res;
  } catch (err) {
    throw new Error();
  }
};

export const getMovesEstimationsData = async (page?: number, pageSize?: number) => {
  try {
    const params = {
      page: page,
      pageSize: pageSize,
      filter: 'all',
    };
    const res = await getRequest('/moves/estimations', params);
    return res;
  } catch (error) {
    console.error('Get Moves Estimations Data', error);
    throw error;
  }
};

export const postMovesConfirm = async (moveId: string, estimationId: string) => {
  try {
    const res = await postRequest(`/moves/${moveId}/confirm/${estimationId}`);
    return res;
  } catch (error) {
    console.error('Post Moves Confirmation Error', error);
    throw error;
  }
};
