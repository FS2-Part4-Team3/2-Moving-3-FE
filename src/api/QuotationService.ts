import { postRequest } from '@/utils/requestFunctions';

export const postQuotation = async (serviceType: string, date: string, fromAddress: string, toAddress: string) => {
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
    console.error('Post quotation error: ', err);
  }
};

export const postRequestDriver = async (driverId: string) => {
  try {
    const res = await postRequest(`/requests/${driverId}`);
    return res;
  } catch (err) {
    console.error('Post request error: ', err);
  }
};
