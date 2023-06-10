import { configDotenv } from "dotenv";

configDotenv();

export const config = {
  catAsAServiceUrl: process.env.CAT_AS_A_SERVICE_URL,
};