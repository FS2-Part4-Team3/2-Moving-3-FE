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
