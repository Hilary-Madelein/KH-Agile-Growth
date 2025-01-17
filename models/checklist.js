'use strict';
module.exports = (sequelize, DataTypes) => {
    const checklist = sequelize.define('checklist', {
        titulo: { 
            type: DataTypes.STRING(255), 
            allowNull: false 
        },
        external_id: { 
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4,
            unique: true 
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    checklist.associate = function(models) {
        checklist.hasMany(models.pregunta_checklist, { 
            foreignKey: 'id_checklist', 
            as: 'preguntas'
        });
    };

    checklist.initializeDefaults = async function () {
        const count = await checklist.count();
        if (count > 0) {
            console.log("Los datos del catálogo 'checklist' ya están inicializados.");
            return;
        }
    
        const defaultSections = [
            { titulo: "Cobertura del Ciclo de Vida" },
            { titulo: "Trazabilidad" },
            { titulo: "Cumplimiento de Requisitos" },
            { titulo: "Gestión de Riesgos" },
            { titulo: "Calidad del Producto" },
            { titulo: "Seguridad" },
            { titulo: "Tiempo de Respuesta" },
            { titulo: "Adaptabilidad y Flexibilidad" },
            { titulo: "Automatización" },
            { titulo: "Mejora Continua" },
        ];
    
        await checklist.bulkCreate(defaultSections);
        console.log("Catálogo 'checklist' inicializado.");
    };
    

    return checklist;
};
