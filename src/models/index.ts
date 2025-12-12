import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// import semua init model
import initUserModel, { User, UserRole } from "./user.model";
import initBantexModel, { Bantex } from "./bantex.model";
import initTypeModel, { Type } from "./type.model";
import initRackModel, { Rack} from "./rack.model";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 5432),
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: false, // karena kita menggunakan created_at, updated_at manual
    underscored: true,
  },
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
export { sequelize, User, Bantex, Type, Rack};

// ⚠️ Export tipe UserRole agar bisa dipakai di controller
export type { UserRole };
