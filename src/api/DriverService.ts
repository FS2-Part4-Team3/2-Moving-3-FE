import { getRequest } from '@/utils/requestFunctions';

export const getDriverData = async () => {
  try {
<<<<<<< HEAD
    const res = await getRequest('/data/driversData.json');
    return res || [];
=======
    const result = await getRequest('/data/driversData.json');
    return result || [];
>>>>>>> 704f446 (Feat:#84 - review card ui)
  } catch (error) {
    console.error('Error fetching driver data:', error);
    return;
  }
};

export async function getDriverDetailData(driverId: string) {
  try {
    const response = await getRequest(`/data/driversDetailData.json`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getMoveInfoData = async () => {
  try {
<<<<<<< HEAD
    const res = await getRequest('/data/moveInfosData.json');
    return res || [];
=======
    const result = await getRequest('/data/moveInfosData.json');
    return result || [];
>>>>>>> 704f446 (Feat:#84 - review card ui)
  } catch (error) {
    console.error('Error fetching user data:', error);
    return;
  }
};

export const getEstimationData = async () => {
  try {
<<<<<<< HEAD
    const res = await getRequest('/data/estimationsData.json');
    return res || [];
  } catch (error) {
    console.error('Error fetching estimation data:', error);
=======
    const result = await getRequest('/data/estimationsData.json');
    return result || [];
  } catch (error) {
    console.error('Error fetching estimations data:', error);
>>>>>>> 704f446 (Feat:#84 - review card ui)
    return;
  }
};
