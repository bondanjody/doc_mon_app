import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.removeColumn("masterdata_doc_bantexes_tbl", "location");

  await queryInterface.addColumn("masterdata_doc_bantexes_tbl", "location", {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "masterdata_doc_racks_tbl",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  });
}
