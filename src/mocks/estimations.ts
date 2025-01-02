import { moveInfos } from "./moveInfos";
import { drivers } from "./drivers";

export const estimations = [
  {
    id: "estimation-1",
    createdAt: "2025-01-01T12:00:00Z",
    updatedAt: "2025-01-01T12:00:00Z",
    price: 200000,
    comment: "Estimated price for the move.",
    moveInfo: moveInfos[0],
    driver: drivers[0],
    confirmedFor: null,
    questions: [],
    userNotifications: [],
    driverNotifications: [],
  },
];
