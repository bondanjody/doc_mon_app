import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const sequelize =
  env === "development"
    ? new Sequelize(
        process.env.DB_DEV_NAME!,
        process.env.DB_DEV_USER!,
        process.env.DB_DEV_PASS!,
        {
          host: process.env.DB_DEV_HOST,
          dialect: "postgres",
          logging: console.log,
        }
      )
    : new Sequelize(
        process.env.DB_PROD_NAME!,
        process.env.DB_PROD_USER!,
        process.env.DB_PROD_PASS!,
        {
          host: process.env.DB_PROD_HOST,
          dialect: "postgres",
          logging: false,
        }
      );

export default sequelize;
