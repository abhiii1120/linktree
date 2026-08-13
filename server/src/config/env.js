import dotenv from "dotenv";
dotenv.config();

import z from "zod";
import logger from "./logger.js";
import appConstants from "../constants/app.constants.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstants.PORT),
  MONGO_URI: z.string().default(appConstants.MONGO_URI),
  NODE_ENV: z.string().default(appConstants.NODE_ENV),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  logger.info({ errors: error.format() }, "Invalid env variables");
  process.exit(1);
}

export default Object.freeze(data);
