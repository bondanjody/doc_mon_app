/*
This table is for document bantexes.
*/

import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("masterdata_doc_racks_tbl", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ auto-generate UUID
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // ✅ auto timestamp
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    created_by: {
      type: DataTypes.STRING(75),
      allowNull: false,
      references: {
        model: "masterdata_users_tbl",
        key: "username",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    updated_by: {
      type: DataTypes.STRING(75),
      allowNull: true,
      references: {
        model: "masterdata_users_tbl",
        key: "username",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    deleted_by: {
      type: DataTypes.STRING(75),
      allowNull: true,
      references: {
        model: "masterdata_users_tbl",
        key: "username",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("masterdata_doc_racks_tbl");
}
