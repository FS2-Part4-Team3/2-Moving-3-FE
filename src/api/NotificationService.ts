import { getRequest, postRequest } from '@/utils/requestFunctions';

export const getNotification = async (page?: number, pageSize?: number) => {
  try {
    const params = {
      page: page,
      pageSize: pageSize,
    };
    const res = await getRequest('/notification', params);
    return res;
  } catch (error) {
    console.error('Notification Fetch Error', error);
    throw error;
  }
};

export const postNotificationSingleRead = async (notificationId: string) => {
  try {
    const res = await postRequest(`/notification/${notificationId}/read`);
    return res;
  } catch (error) {
    console.error('Notification Single Read Fetch Error', error);
    throw error;
  }
};

export const postNotificationMultiRead = async (list: string[]) => {
  try {
    const res = await postRequest('/notification/read', list);
    return res;
  } catch (error) {
    console.error('Notification Multi Read Fetch Error', error);
    throw error;
  }
};
