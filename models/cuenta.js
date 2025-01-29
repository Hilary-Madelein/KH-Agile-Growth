'use strict';
module.exports = (sequelize, DataTypes) => {
    const cuenta = sequelize.define('cuenta', {
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
        estado: {type: DataTypes.ENUM("ACEPTADO", "DENEGADO", "ESPERA"), defaultValue: "ESPERA"},
        correo: { type: DataTypes.STRING(50), allowNull: false},
        clave: { type: DataTypes.STRING(150), allowNull: false }
    }, {
        freezeTableName: true
    });

    cuenta.associate = function (models){
        cuenta.belongsTo(models.entidad, {foreignKey: 'id_entidad'});
        cuenta.hasOne(models.peticion, { foreignKey: 'id_cuenta', as: 'peticion'});
    }

    return cuenta;
};