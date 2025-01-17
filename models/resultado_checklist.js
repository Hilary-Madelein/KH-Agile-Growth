'use strict';
module.exports = (sequelize, DataTypes) => {
    const resultado_checklist = sequelize.define('resultado_checklist', {
        respuesta: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        external_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
    }, {
        freezeTableName: true,
    });

    resultado_checklist.associate = function(models) {
        resultado_checklist.belongsTo(models.pregunta_checklist, {
            as: 'pregunta_checklist',
            foreignKey: 'id_pregunta_checklist',
        });
        resultado_checklist.belongsTo(models.proyecto, {
            as: 'proyecto',
            foreignKey: 'id_proyecto',
        });
    };

    return resultado_checklist;
};
