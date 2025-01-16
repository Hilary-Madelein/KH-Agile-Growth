'use strict';
module.exports = (sequelize, DataTypes) => {
    const rol_proyecto = sequelize.define('rol_proyecto', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4,unique: true},
        estado: { type: DataTypes.BOOLEAN, defaultValue: true },
        horasDiarias: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 2 }
    }, {
        freezeTableName: true
    });

    rol_proyecto.associate = function (models) {
        rol_proyecto.belongsTo(models.rol_entidad, { foreignKey: 'id_rol_entidad',as:'rol_entidad' });
        rol_proyecto.belongsTo(models.proyecto, { foreignKey: 'id_proyecto',as:'proyecto_rol' });
    };

    return rol_proyecto;
};