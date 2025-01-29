'use strict';
module.exports = (sequelize, DataTypes) => {
    const nivel_madurez_general = sequelize.define('nivel_madurez_general', {
        nivel_general: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        external_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        estado:{type: DataTypes.BOOLEAN, defaultValue: true},
    }, {
        freezeTableName: true,
        timestamps: true,
    });

    nivel_madurez_general.associate = function(models) {
        nivel_madurez_general.belongsTo(models.proyecto, {
            as: 'proyecto',
            foreignKey: 'id_proyecto',
        });
        nivel_madurez_general.belongsTo(models.nivel_madurez, {
            as: 'nivel_madurez',
            foreignKey: 'id_nivel_madurez',
        });
    };

    return nivel_madurez_general;
};
