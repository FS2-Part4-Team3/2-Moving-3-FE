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
