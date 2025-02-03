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

export const getUserEstimationData = async (page: number, pageSize: number) => {
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
