import { drivers } from "./drivers";
import { users } from "./users";

export const reviews = [
  {
    id: "review-1",
    createdAt: "2025-01-01T12:00:00Z",
    updatedAt: "2025-01-01T12:00:00Z",
    comment: "Great service!",
    score: 5,
    driver: drivers[0],
    owner: users[0],
  },
];
