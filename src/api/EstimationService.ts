import { getRequest, postRequest } from '@/utils/requestFunctions';

export const postDetailEstimationData = async (movesId: string, reject: boolean, comment: string, price?: string) => {
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
    console.error('Fetch error getting reviewable estimation data: ', err);
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

export const getUserEstimationDetailData = async (estimationId: string) => {
  try {
    const res = await getRequest(`/estimations/user/${estimationId}`);
    return res;
  } catch (error) {
    console.error(`Get User Estimation Detail Data Fetch Error: ${estimationId}`, error);
    throw new Error(`Failed to fetch Get User Estimation Detail Data for estimationId: ${estimationId}. Please try again later.`);
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

export const getEstimationsDriverDetail = async (estimationId: string) => {
  try {
    const res = await getRequest(`/estimations/driver/${estimationId}`);
    return res;
  } catch (error) {
    console.error(`Get Driver Estimation Detail Data Fetch Error: ${estimationId}`, error);
    throw new Error(
      `Failed to fetch Get Driver Estimation Detail Data for estimationId: ${estimationId}. Please try again later.`,
    );
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

export const getEstimationConfirmedDetail = async (estimationId: string) => {
  try {
    const res = await getRequest(`/estimations/confirmed/${estimationId}`);
    return res;
  } catch (error) {
    console.error('Get Estimation Confirmed Detail Fetch Error', error);
    throw error;
  }
};
