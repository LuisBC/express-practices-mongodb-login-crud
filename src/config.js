import { config } from "dotenv";

config();

export const MONGODB_HOST = process.env.MONGODB_HOST;
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

export const PORT = process.env.PORT || 3000;
