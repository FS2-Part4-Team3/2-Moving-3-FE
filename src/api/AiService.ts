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
