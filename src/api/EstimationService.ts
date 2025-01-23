import { postRequest } from '@/utils/requestFunctions';

export const PostDetailEstimationData = async (movesId: string, reject: boolean, comment: string, price: string) => {
  const params = {
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
