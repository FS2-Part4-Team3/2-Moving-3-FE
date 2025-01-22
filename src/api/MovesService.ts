import { getRequest, postRequest } from '@/utils/requestFunctions';

export const getMovesListData = async (
  page: number,
  pageSize: number,
  keyword: string | undefined,
  orderBy: string,
  serviceType: string,
  serviceArea: 'Active' | 'Inactive',
  designatedRequest: 'Active' | 'Inactive',
) => {
  const params = {
    page: page,
    pageSize: pageSize,
    keyword: keyword,
    orderBy: orderBy,
    serviceType: serviceType,
    serviceArea: serviceArea,
    designatedRequest: designatedRequest,
  };

  try {
    const data = await getRequest('/moves', params);
    return data;
  } catch (error) {
    console.error('Get Move List Fetch Error:', error);
    throw error;
  }
};

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
