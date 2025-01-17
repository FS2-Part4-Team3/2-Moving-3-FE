import { getRequest } from '@/utils/requestFunctions';

export const getMyReviewData = async (page: number, pageSize: number) => {
  const params = {
    page: page,
    pageSize: pageSize,
  };

  try {
    const res = await getRequest('/reviews/my', params);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch my review data: ', err);
    throw err;
  }
};
