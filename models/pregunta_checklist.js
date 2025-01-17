'use strict';
module.exports = (sequelize, DataTypes) => {
    const pregunta_checklist = sequelize.define('pregunta_checklist', {
        pregunta: {
            type: DataTypes.STRING(500),
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

    pregunta_checklist.associate = function (models) {
        pregunta_checklist.belongsTo(models.checklist, {
            foreignKey: 'id_checklist',
            as: 'checklist'
        });
    };

    pregunta_checklist.initializeDefaults = async function (models) {
        const count = await pregunta_checklist.count();

        if (count > 0) {
            console.log("Los datos del catálogo 'pregunta_checklist' ya están inicializados.");
            return;
        }

        const defaultQuestions = {
            "Cobertura del Ciclo de Vida": [
                "¿Se definen objetivos claros en la etapa de planificación?",
                "¿Se documenta el análisis de requisitos?",
                "¿Se elabora un diseño técnico detallado?",
                "¿Se realizan revisiones técnicas durante cada fase del ciclo de vida?",
                "¿Se ejecutan pruebas de integración para asegurar la interoperabilidad entre componentes?",
                "¿Se realizan pruebas de aceptación por parte del cliente?",
                "¿Se implementan protocolos de mantenimiento post-entrega?",
            ],
            "Trazabilidad": [
                "¿Los requisitos cuentan con identificadores únicos?",
                "¿Se mantienen actualizados los registros de cambios en los requisitos?",
                "¿Existe una relación clara entre los casos de prueba y los requisitos?",
                "¿Se rastrea cada defecto detectado hasta su causa raíz?",
                "¿Se documentan las versiones del producto con los cambios asociados?",
                "¿Se utilizan herramientas especializadas para la trazabilidad (ej., JIRA, Azure DevOps)?",
            ],
            "Cumplimiento de Requisitos": [
                "¿Se establecen criterios claros de aceptación para cada requisito?",
                "¿Se revisan los requisitos con los stakeholders antes de comenzar el desarrollo?",
                "¿Se validan los requisitos funcionales a través de prototipos o pruebas iniciales?",
                "¿Se verifican los requisitos no funcionales, como rendimiento y escalabilidad?",
                "¿Se utilizan métricas para evaluar el grado de cumplimiento de los requisitos?",
            ],
            "Gestión de Riesgos": [
                "¿Se elabora un registro inicial de riesgos antes de iniciar el proyecto?",
                "¿Se priorizan los riesgos en función de su probabilidad e impacto?",
                "¿Se asignan responsables específicos para cada riesgo identificado?",
                "¿Se implementan controles preventivos para mitigar riesgos críticos?",
                "¿Se realiza un monitoreo continuo de los riesgos durante todo el proyecto?",
                "¿Se documentan lecciones aprendidas para evitar riesgos similares en futuros proyectos?",
            ],
            "Calidad del Producto": [
                "¿Se realizan revisiones de código antes de la integración?",
                "¿Se implementan pruebas unitarias para cada módulo desarrollado?",
                "¿Se ejecutan pruebas de estrés para evaluar la capacidad del software bajo alta carga?",
                "¿Se mide la usabilidad del software a través de pruebas con usuarios finales?",
                "¿Se analiza la eficiencia del código para reducir el consumo de recursos?",
                "¿Se validan los resultados obtenidos frente a los estándares de calidad definidos (ISO/IEC 25010)?",
            ],
            "Seguridad": [
                "¿Se realiza un análisis de vulnerabilidades durante la etapa de desarrollo?",
                "¿Se aplican prácticas seguras de codificación para prevenir inyecciones SQL, XSS, entre otros?",
                "¿Se incluyen autenticación y autorización para controlar el acceso al sistema?",
                "¿Se utiliza encriptación para datos sensibles en tránsito y en reposo?",
                "¿Se ejecutan pruebas de penetración para identificar posibles brechas de seguridad?",
                "¿El equipo recibe capacitación en seguridad informática?",
            ],
            "Tiempo de Respuesta": [
                "¿Se define un tiempo máximo aceptable de respuesta para las principales funciones del software?",
                "¿Se realizan pruebas de rendimiento bajo diferentes escenarios de carga?",
                "¿Se optimiza el uso de recursos como memoria y CPU para mejorar los tiempos de respuesta?",
                "¿Se registran y analizan los tiempos de respuesta en el entorno de producción?",
                "¿Se optimizan consultas a la base de datos para reducir los tiempos de ejecución?",
            ],
            "Adaptabilidad y Flexibilidad": [
                "¿Se pueden realizar modificaciones en el software sin afectar otros módulos?",
                "¿El diseño del software permite la incorporación de nuevas funcionalidades fácilmente?",
                "¿Se documentan las dependencias entre componentes para facilitar los cambios?",
                "¿El software puede escalar horizontal o verticalmente para manejar más usuarios o datos?",
                "¿Se realizan pruebas de regresión para asegurar que los cambios no introducen nuevos defectos?",
                "¿Se utiliza una arquitectura basada en microservicios o modularidad para facilitar la adaptabilidad?",
            ],
            "Automatización": [
                "¿Se automatizan las pruebas unitarias, de integración y de regresión?",
                "¿Se implementa un pipeline de integración y despliegue continuo (CI/CD)?",
                "¿Se automatizan procesos de generación de documentación?",
                "¿Se utilizan scripts para configurar entornos de desarrollo, prueba y producción?",
                "¿Se monitorizan automáticamente los sistemas en producción para detectar fallos o anomalías?",
                "¿Se realizan auditorías automáticas de seguridad y calidad del código?",
            ],
            "Mejora Continua": [
                "¿El equipo realiza reuniones de retrospectiva al final de cada sprint o iteración?",
                "¿Se implementan mejoras sugeridas por el equipo o clientes en ciclos posteriores?",
                "¿Se utilizan indicadores clave de desempeño (KPIs) para evaluar el progreso del proyecto?",
                "¿El equipo participa en capacitaciones regulares para mejorar sus habilidades?",
                "¿Se adoptan nuevas herramientas o metodologías para mejorar la eficiencia y calidad?",
                "¿Se registra un historial de todas las mejoras implementadas para futuros proyectos?",
            ],
        };

        for (const [title, questions] of Object.entries(defaultQuestions)) {
            const checklist = await models.checklist.findOne({ where: { titulo: title } });
            if (checklist) {
                const questionsToCreate = questions.map((question) => ({
                    id_checklist: checklist.id,
                    pregunta: question,
                }));
                await pregunta_checklist.bulkCreate(questionsToCreate);
            }
        }
        console.log("Catálogo 'pregunta_checklist' inicializado.");
    };

    return pregunta_checklist;
};
