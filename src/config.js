import { config as dotenv } from "dotenv";
dotenv();

export const config = {
  host: process.env.DB_HOST || "31.170.166.145",
  user: process.env.DB_USER || "u524788796_tasks",
  password: process.env.DB_PASSWORD || "Tasks2021",
  database: process.env.DB_DATABASE || "u524788796_tasks",
};
