import * as dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENT = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 3000,
    ENV: process.env.APP_ENV,
    SECRET: process.env.APP_SECRET,
    PAYSTACK: process.env.PAYSTACK_PUBLIC_KEY,
  },
  DB: {
    URL: process.env.DB_URL,
  },
};
