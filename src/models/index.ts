import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// import semua init model
import initUserModel, { User, UserRole } from "./user.model";
import initBantexModel, { Bantex } from "./bantex.model";
import initTypeModel, { Type } from "./type.model";
import initRackModel, { Rack } from "./rack.model";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize({
  database: isProduction ? process.env.DB_PROD_NAME! : process.env.DB_DEV_NAME!,
  username: isProduction ? process.env.DB_PROD_USER! : process.env.DB_DEV_USER!,
  password: isProduction ? process.env.DB_PROD_PASS! : process.env.DB_DEV_PASS!,
  host: isProduction ? process.env.DB_PROD_HOST! : process.env.DB_DEV_HOST!,
  port: Number(
    isProduction ? process.env.DB_PROD_PORT : process.env.DB_DEV_PORT
  ),
  dialect: "postgres",
  logging: !isProduction, // production: no logging
});

// ==========================
// INIT SEMUA MODEL
// ==========================
initUserModel(sequelize);
initBantexModel(sequelize);
initRackModel(sequelize);
initTypeModel(sequelize);

// ==========================
// RELASI AUDIT TRAIL → USER
// ==========================

// Bantex
Bantex.belongsTo(User, { foreignKey: "created_by", as: "creator_user" });
Bantex.belongsTo(User, { foreignKey: "updated_by", as: "updater_user" });
Bantex.belongsTo(User, { foreignKey: "deleted_by", as: "deleter_user" });

// Type
Type.belongsTo(User, { foreignKey: "created_by", as: "creator_user" });
Type.belongsTo(User, { foreignKey: "updated_by", as: "updater_user" });
Type.belongsTo(User, { foreignKey: "deleted_by", as: "deleter_user" });

// Rack
Rack.belongsTo(User, { foreignKey: "created_by", as: "creator_user" });
Rack.belongsTo(User, { foreignKey: "updated_by", as: "updater_user" });
Rack.belongsTo(User, { foreignKey: "deleted_by", as: "deleter_user" });

// ==========================
// EXPORT SEMUA MODEL
// ==========================
export { sequelize, User, Bantex, Type, Rack };

// ⚠️ Export tipe UserRole agar bisa dipakai di controller
export type { UserRole };
