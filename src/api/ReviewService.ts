import { getRequest, postRequest } from '@/utils/requestFunctions';

export const getMyReviewData = async (page: number, pageSize: number) => {
  const params = {
    page: page,
    pageSize: pageSize,
  };

  try {
    const res = await getRequest('/reviews/my', params);
    return res || [];
  } catch (err) {
    console.error('Fetch my review data: ', err);
    throw err;
  }
};

export const postReviewData = async (estimationId: string, comment: string, score: number) => {
  const requestBody = {
    comment: comment,
    score: score,
  };
  try {
    const res = await postRequest(`/reviews/${estimationId}`, requestBody);
    return res;
  } catch (err) {
    console.error('Post review data: ', err);
    throw err;
  }
};
