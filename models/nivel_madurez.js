'use strict';

module.exports = (sequelize, DataTypes) => {
    const nivel_madurez = sequelize.define('nivel_madurez', {
        nombre: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT, 
            allowNull: false,
        },
        rango_minimo: {
            type: DataTypes.DECIMAL(5, 2), 
            allowNull: false,
        },
        rango_maximo: {
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

    nivel_madurez.associate = function(models) {
        nivel_madurez.hasMany(models.resultado_categoria, {
            as: 'resultado_categoria',
            foreignKey: 'id_nivel_madurez',
        });
        nivel_madurez.hasMany(models.nivel_madurez_general, {
            as: 'nivel_madurez_general',
            foreignKey: 'id_nivel_madurez',
        });
    };

    // Método para inicializar el catálogo de niveles de madurez
    nivel_madurez.initializeDefaults = async function () {
        const niveles = [
            {
                nombre: 'Exploratorio',
                descripcion: 'El enfoque está en resolver problemas inmediatos. Los procesos son inestables y altamente dependientes de esfuerzos individuales. No hay claridad en la gestión de recursos ni en los resultados esperados.',
                rango_minimo: 0.00,
                rango_maximo: 40.00,
            },
            {
                nombre: 'Emergente',
                descripcion: 'Se observan prácticas iniciales y cierta repetibilidad en los procesos. La gestión es más reactiva que proactiva, aunque hay un enfoque en la organización básica. Se empieza a identificar la importancia de la calidad.',
                rango_minimo: 41.00,
                rango_maximo: 60.00,
            },
            {
                nombre: 'Estandarizado',
                descripcion: 'Los procesos son consistentes, documentados y están alineados con estándares reconocidos. Existe un enfoque en la prevención de errores y la sostenibilidad de los resultados. Las métricas empiezan a integrarse como parte de la gestión.',
                rango_minimo: 61.00,
                rango_maximo: 80.00,
            },
            {
                nombre: 'Optimizado Avanzado',
                descripcion: 'Los procesos están bajo control, respaldados por mediciones consistentes. Se priorizan estrategias para mejora continua basada en datos y análisis. El software es predecible en calidad, tiempo y resultados.',
                rango_minimo: 81.00,
                rango_maximo: 90.00,
            },
            {
                nombre: 'Excelencia Innovadora',
                descripcion: 'Máxima adaptabilidad y capacidad para enfrentar desafíos tecnológicos. Los procesos son flexibles, innovadores y constantemente mejorados. La organización establece tendencias y estándares en la industria.',
                rango_minimo: 91.00,
                rango_maximo: 100.00,
            },
        ];

        for (const nivel of niveles) {
            const [instance, created] = await nivel_madurez.findOrCreate({
                where: { nombre: nivel.nombre },
                defaults: nivel,
            });

            if (created) {
                console.log(`Nivel de madurez '${nivel.nombre}' inicializado.`);
            } else {
                console.log(`Nivel de madurez '${nivel.nombre}' ya existe.`);
            }
        }
    };

    return nivel_madurez;
};
