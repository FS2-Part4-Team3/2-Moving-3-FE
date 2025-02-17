import { ChatRead } from '@/interfaces/Card/ChatCardInterface';
import { getRequest, postRequest } from '@/utils/requestFunctions';

export const getChatListData = async (page: number, pageSize: number) => {
  const params = {
    page: page,
    pageSize: pageSize,
  };

  try {
    const res = await getRequest('/chats', params);
    return res || [];
  } catch (err) {
    console.error('Fetch chat list data: ', err);
    throw err;
  }
};

export const getChatData = async (targetId: string, page: number, pageSize: number) => {
  const params = {
    page: page,
    pageSize: pageSize,
  };

  try {
    const res = await getRequest(`/chats/${targetId}`, params);
    return res || [];
  } catch (err) {
    console.error('Fetch chat data: ', err);
    throw err;
  }
};

export const postRead = async (targetId: string, ids: ChatRead) => {
  try {
    const res = await postRequest(`/chats/${targetId}/read`, ids);
    return res;
  } catch (err) {
    console.error('Post read error', err);
    throw err;
  }
};
