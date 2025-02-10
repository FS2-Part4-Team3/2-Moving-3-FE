import { getRequest, postRequest } from '@/utils/requestFunctions';

export const postDetailEstimationData = async (movesId: string, reject: boolean, comment: string, price = '') => {
  const params = {
    reject: reject,
    comment: comment,
    price: price,
  };

  try {
    const data = await postRequest(`/estimations/${movesId}`, params);
    return data;
  } catch (error) {
    console.error('Post Detail Estimation Data Fetch Error:', error);
    throw error;
  }
};

export const getReviewableEstimations = async (page: number, pageSize: number) => {
  const params = { page, pageSize };

  try {
    const data = await getRequest('/estimations/reviewable', params);
    return data;
  } catch (err) {
    console.log('Fetch error getting reviewable estimation data: ', err);
    throw err;
  }
};

export const getUserEstimationData = async (page?: number, pageSize?: number) => {
  const params = {
    page: page,
    pageSize: pageSize,
  };

  try {
    const res = await getRequest('/estimations/user', params);
    return res;
  } catch (error) {
    console.error('Get User Estimation Data Fetch Error', error);
    throw error;
  }
};

export const getEstimationsDriver = async (page: number, pageSize: number) => {
  try {
    const params = {
      page: page,
      pageSize: pageSize,
    };
    const res = await getRequest('/estimations/driver', params);
    return res;
  } catch (error) {
    console.error('Get Estimation Driver Fetch Error', error);
    throw error;
  }
};

export const getEstimationsRejected = async (page: number, pageSize: number) => {
  try {
    const params = {
      page: page,
      pageSize: pageSize,
    };
    const res = await getRequest('/estimations/rejected', params);
    return res;
  } catch (error) {
    console.error('Get Estimation Rejected Fetch Error', error);
    throw error;
  }
};
