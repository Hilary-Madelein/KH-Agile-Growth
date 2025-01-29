'use strict';
module.exports = (sequelize, DataTypes) => {
    const resultado_categoria = sequelize.define('resultado_categoria', {
        porcentaje_cumplimiento: {
            type: DataTypes.DECIMAL(5, 2), 
            allowNull: false,
        },
        external_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        estado:{type: DataTypes.BOOLEAN, defaultValue: true},
    }, {
        freezeTableName: true,
    });

    resultado_categoria.associate = function(models) {
        resultado_categoria.belongsTo(models.checklist, {
            as: 'categoria',
            foreignKey: 'id_checklist',
        });
        resultado_categoria.belongsTo(models.proyecto, {
            as: 'proyecto',
            foreignKey: 'id_proyecto',
        });
        resultado_categoria.belongsTo(models.nivel_madurez, {
            as: 'nivel_madurez',
            foreignKey: 'id_nivel_madurez',
        });
    };

    return resultado_categoria;
};
