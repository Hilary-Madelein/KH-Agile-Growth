"use strict";
module.exports = (sequelize, DataTypes) => {
  const proyecto = sequelize.define(
    "proyecto",
    {
      external_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      estado: { type: DataTypes.BOOLEAN, defaultValue: true },
      nombre: { type: DataTypes.STRING(40), allowNull: false },
      fecha_inicio: { type: DataTypes.DATE },
      descripcion: { type: DataTypes.STRING(350), allowNull: true },
      terminado: { type: DataTypes.BOOLEAN, defaultValue: false },
      razon_terminado: { type: DataTypes.STRING(255), allowNull: true },
    },
    {
      freezeTableName: true,
    }
  );
  proyecto.associate = function (models) {
    proyecto.hasMany(models.rol_proyecto, { foreignKey: 'id_proyecto', as: 'proyecto_rol' });
    proyecto.hasMany(models.resultado_checklist, { foreignKey: 'id_proyecto', as: 'resultado_checklist' });
    proyecto.hasMany(models.resultado_categoria, { as: 'resultado_categoria', foreignKey: 'id_proyecto' });
    proyecto.hasMany(models.nivel_madurez_general, { as: 'nivel_madurez_general', foreignKey: 'id_proyecto' });
  };

  return proyecto;
};
