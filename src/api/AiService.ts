import { getRequest } from '@/utils/requestFunctions';

export const getReviewSummaryDetail = async (driverId: string) => {
  try {
    const res = await getRequest(`/reviewSummary/${driverId}`);
    return res;
  } catch (error) {
    console.error('Get Review Summary Detail Data Fetch Error', error);
    throw error;
  }
};

export const getReviewKeyword = async (driverId: string, filter: 'ALL' | 'POSITIVE' | 'NEGATIVE') => {
  try {
    const params = {
      filter: filter,
    };
    const res = await getRequest(`/reviewKeywords/${driverId}`, params);
    return res;
  } catch (error) {
    console.error('Get Review Keyword Data Fetch Error', error);
    throw error;
  }
};
