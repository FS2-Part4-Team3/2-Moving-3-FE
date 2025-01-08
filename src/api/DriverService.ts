import { getRequest } from "@/utils/abstractApi";

export const getDriverData = async () => {
  try {
    const result = await getRequest("/data/driversData.json");
    console.log(result);
    return result || [];
  } catch (error) {
    console.error("Error fetching driver data:", error);
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

export const getUserData = async () => {
  try {
    const response = await getRequest("/data/userData.json");
    return response;
  } catch (error) {
    console.error("Error fetching driver data: ", error);
    return;
  }
};
