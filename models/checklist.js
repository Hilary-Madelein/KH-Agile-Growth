'use strict';
module.exports = (sequelize, DataTypes) => {
    const checklist = sequelize.define('checklist', {
        titulo: { 
            type: DataTypes.STRING(40), 
            allowNull: false 
        },
        external_id: { 
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4,
            unique: true 
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        peso: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        justificacion_peso: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        checklist.hasMany(models.resultado_categoria, {
            as: 'resultado_categoria',
            foreignKey: 'id_checklist',
        });
    };

    checklist.initializeDefaults = async function () {
        const count = await checklist.count();
        if (count > 0) {
            console.log("Los datos del catálogo 'checklist' ya están inicializados.");
            return;
        }
    
        const defaultSections = [
            { 
                titulo: "Cobertura del Ciclo de Vida", 
                descripcion: "Evalúa si el proyecto abarca todas las fases del desarrollo de software, desde la planificación y análisis de requisitos hasta el despliegue y mantenimiento. Incluye la documentación detallada y la gestión fluida entre fases, asegurando entregables definidos en cada etapa.",
                peso: 2,
                justificacion_peso: "Este aspecto garantiza que todas las fases críticas del desarrollo (requisitos, diseño, pruebas, mantenimiento) estén correctamente cubiertas. Los modelos de madurez como CMMI destacan que un ciclo de vida bien gestionado es esencial para establecer las bases del éxito del proyecto."
            },
            { 
                titulo: "Trazabilidad", 
                descripcion: "Se enfoca en la capacidad de rastrear requisitos y su evolución a lo largo del proyecto. Incluye la documentación de cambios, vínculos con entregables y aprobaciones, y la validación por parte de los usuarios finales. La trazabilidad asegura que todo cambio esté controlado y justificado.",
                peso: 2,
                justificacion_peso: "La trazabilidad asegura que los requisitos estén correctamente vinculados a entregables específicos. Según CMMI, un control débil en la trazabilidad puede conducir a defectos y a productos que no cumplen con las necesidades del cliente."
            },
            { 
                titulo: "Cumplimiento de Requisitos", 
                descripcion: "Analiza el grado en que los requisitos funcionales y no funcionales son cumplidos. Asegura que el proyecto esté alineado con los estándares definidos y que los entregables respondan a las necesidades del cliente, incluyendo criterios de aceptación claros y métricas de calidad.",
                peso: 3,
                justificacion_peso: "Los requisitos son fundamentales porque determinan lo que el producto debe lograr. En CMMI, el cumplimiento de requisitos es una de las áreas más relevantes para determinar la madurez del proyecto."
            },
            { 
                titulo: "Gestión de Riesgos", 
                descripcion: "Evalúa cómo el equipo identifica, prioriza y mitiga riesgos potenciales en el proyecto. Incluye la existencia de un plan formal de gestión de riesgos, la asignación de responsables y la revisión constante de riesgos emergentes o residuales durante el ciclo de vida del software.",
                peso: 3,
                justificacion_peso: "Identificar y mitigar riesgos asegura que el proyecto no se deteriore por problemas imprevistos. TMMI clasifica la gestión de riesgos como clave para alcanzar los niveles más altos de madurez."
            },
            { 
                titulo: "Calidad del Producto", 
                descripcion: "Mide si se implementan procesos y herramientas para garantizar que el software cumpla con estándares de calidad predefinidos. Se evalúan pruebas de calidad, la documentación de resultados, la participación del cliente en la validación y la capacidad del equipo para cumplir con las expectativas.",
                peso: 3,
                justificacion_peso: "La calidad garantiza que el producto entregue valor real al cliente. Según CMMI, los niveles de madurez más altos dependen de estándares claros y consistentes de calidad."
            },
            { 
                titulo: "Seguridad", 
                descripcion: "Revisa las prácticas para garantizar la protección de datos y la integridad del software. Incluye análisis de vulnerabilidades, pruebas de penetración, implementación de controles de acceso y encriptación, así como la preparación del equipo en prácticas seguras.",
                peso: 3,
                justificacion_peso: "Con el crecimiento de riesgos cibernéticos, los marcos modernos como CMMI y prácticas de madurez enfatizan la importancia de integrar seguridad desde el inicio del desarrollo."
            },
            { 
                titulo: "Tiempo de Respuesta", 
                descripcion: "Evalúa la eficiencia del software bajo diferentes escenarios. Se enfoca en el cumplimiento de tiempos de respuesta establecidos, pruebas de carga, optimización de consultas, y la capacidad de escalar el sistema para soportar mayores demandas.",
                peso: 2,
                justificacion_peso: "Es una métrica de desempeño clave para garantizar la satisfacción del cliente final. Aunque importante, está subordinada a otros aspectos como seguridad y calidad."
            },
            { 
                titulo: "Adaptabilidad y Flexibilidad", 
                descripcion: "Analiza la capacidad del software para incorporar cambios y adaptarse a nuevos requisitos. Incluye diseño modular, compatibilidad entre versiones, pruebas de regresión y la arquitectura del sistema para facilitar escalabilidad y adaptabilidad.",
                peso: 2,
                justificacion_peso: "Es fundamental para mantener la relevancia del producto en entornos cambiantes, especialmente en proyectos ágiles. Sin embargo, su impacto es más bajo que aspectos como calidad y seguridad."
            },
            { 
                titulo: "Automatización", 
                descripcion: "Examina el uso de herramientas y procesos automáticos en pruebas, integración, despliegue y monitoreo. La automatización busca mejorar la eficiencia, reducir errores y garantizar la consistencia en las entregas.",
                peso: 1,
                justificacion_peso: "Si bien la automatización mejora la eficiencia, no es crítica en niveles iniciales de madurez. CMMI menciona la automatización como un facilitador en niveles avanzados."
            },
            { 
                titulo: "Mejora Continua", 
                descripcion: "Evalúa si el equipo está comprometido con la optimización de procesos y la implementación de lecciones aprendidas. Incluye reuniones retrospectivas, recopilación de métricas de desempeño y adopción de nuevas tecnologías o metodologías para elevar la calidad del proyecto.",
                peso: 2,
                justificacion_peso: "La mejora continua refleja los niveles más altos de madurez, pero depende de bases sólidas en las demás áreas. CMMI y TMMI incluyen la mejora continua como objetivo en los niveles más avanzados."
            }
        ];
    
        await checklist.bulkCreate(defaultSections);
        console.log("Catálogo 'checklist' inicializado.");
    };

    return checklist;
};
