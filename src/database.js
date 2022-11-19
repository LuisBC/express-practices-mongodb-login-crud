import mongoose from "mongoose";
import { MONGODB_HOST, MONGODB_DATABASE } from "./config";

const MONGODB_URI = `mongodb://${MONGODB_HOST}:27017/${MONGODB_DATABASE}`;

console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {})
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
