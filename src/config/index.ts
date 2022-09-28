import dotenv from "dotenv";

// Set the NODE_ENV to 'DEVelopment' by default
process.env.NODE_ENV = process.env.NODE_ENV || "DEVelopment";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * environment
   */
  env: process.env.NODE_ENV as string,

  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT as string, 10) as number,

  user: process.env.DEV_DB_USER,
  host: process.env.DEV_DB_HOST,
  database: process.env.DEV_DB_DB,
  password: process.env.DEV_DB_PASSWORD,

  /**
   * jwt_secret
   */
  jwtSecret: process.env.JWT_SECRET as string,

  /**
   * AWS
   */
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY
};
