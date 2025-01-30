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
        estado:{type: DataTypes.BOOLEAN, defaultValue: true},
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    pregunta_checklist.associate = function (models) {
        pregunta_checklist.belongsTo(models.checklist, {
            foreignKey: 'id_checklist',
            as: 'checklist'
        });

        pregunta_checklist.hasMany(models.resultado_checklist, {
            foreignKey: 'id_pregunta_checklist',
            as: 'resultados'
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
                "¿El proyecto cubre todas las fases desde el análisis de requisitos hasta las pruebas finales?",
                "¿Se ha documentado cada fase del ciclo de vida de manera detallada?",
                "¿Existen entregables definidos para cada etapa del proyecto?",
                "¿Se realizan revisiones formales al final de cada fase del ciclo de vida?",
                "¿El equipo tiene claridad sobre las actividades necesarias en cada fase del proyecto?",
                "¿Se han identificado dependencias entre fases del ciclo de vida?",
                "¿Las lecciones aprendidas se recopilan y aplican en fases futuras del proyecto?",
                "¿Hay una transición fluida entre las fases del proyecto?",
                "¿Se ha asignado un responsable para la supervisión de cada fase del ciclo de vida?",
                "¿El equipo utiliza herramientas específicas para la gestión del ciclo de vida del proyecto?",
            ],
            "Trazabilidad": [
                "¿Los requisitos están vinculados a entregables específicos?",
                "¿Existen herramientas para rastrear los cambios en los requisitos a lo largo del proyecto?",
                "¿Se documentan los impactos de los cambios en los requisitos?",
                "¿Cada entregable tiene un historial asociado de requisitos y aprobaciones?",
                "¿Los usuarios finales validan los requisitos antes de su implementación?",
                "¿Se mantiene un registro de decisiones clave relacionadas con los requisitos?",
                "¿La documentación de trazabilidad es accesible para todos los miembros del equipo?",
                "¿Se realizan auditorías para garantizar la trazabilidad de los requisitos?",
                "¿El sistema soporta consultas rápidas sobre el estado de los requisitos?",
                "¿Los cambios en los requisitos son aprobados por las partes interesadas antes de su implementación?",
            ],
            "Cumplimiento de Requisitos": [
                "¿El equipo realiza validaciones periódicas del cumplimiento de requisitos?",
                "¿Se ha documentado claramente el alcance del proyecto y sus requisitos?",
                "¿Los entregables cumplen con los estándares definidos en los requisitos funcionales?",
                "¿Los requisitos no funcionales, como rendimiento y seguridad, se cumplen de manera consistente?",
                "¿Existen criterios de aceptación para validar el cumplimiento de los requisitos?",
                "¿El cliente aprueba cada entregable antes de proceder con la siguiente fase?",
                "¿Se mide el grado de cumplimiento de los requisitos al finalizar el proyecto?",
                "¿Los cambios en los requisitos son gestionados sin comprometer el alcance del proyecto?",
                "¿Existen métricas para evaluar la calidad de los entregables en relación con los requisitos?",
                "¿El equipo está capacitado para interpretar y aplicar los requisitos de manera adecuada?",
            ],
            "Gestión de Riesgos": [
                "¿Se identifican riesgos potenciales al inicio de cada fase del proyecto?",
                "¿Existe un plan formal de gestión de riesgos documentado?",
                "¿Los riesgos se categorizan por su impacto y probabilidad?",
                "¿El equipo revisa regularmente los riesgos identificados?",
                "¿Se asignan responsables para mitigar cada riesgo identificado?",
                "¿Existen procedimientos establecidos para gestionar riesgos emergentes durante el proyecto?",
                "¿El cliente está informado sobre los riesgos clave del proyecto?",
                "¿Se evalúan regularmente los riesgos residuales después de implementar las acciones de mitigación?",
                "¿El equipo utiliza herramientas específicas para la gestión de riesgos?",
                "¿Se dispone de métricas para medir la efectividad de las estrategias de mitigación?",
            ],
            "Calidad del Producto": [
                "¿Se han definido estándares claros de calidad para el proyecto?",
                "¿El equipo realiza pruebas de calidad en cada fase del desarrollo?",
                "¿Los defectos identificados se clasifican según su impacto en el producto?",
                "¿Existen criterios claros para considerar un entregable como \"listo para producción\"?",
                "¿Se documentan los resultados de las pruebas de calidad para referencia futura?",
                "¿El producto final cumple con las expectativas del cliente y los estándares de la industria?",
                "¿Se implementan auditorías regulares para garantizar la calidad del producto?",
                "¿El equipo recibe capacitación en mejores prácticas de calidad?",
                "¿Se utilizan herramientas automatizadas para pruebas de calidad?",
                "¿El cliente participa en la validación de los criterios de calidad?",
            ],
            "Seguridad": [
                "¿Se realiza un análisis detallado de vulnerabilidades antes del despliegue del producto?",
                "¿El producto cumple con estándares reconocidos de seguridad establecidos para su industria o sector?",
                "¿Se llevan a cabo pruebas de penetración periódicas para identificar posibles brechas de seguridad?",
                "¿Los datos sensibles se protegen mediante encriptación tanto en tránsito como en reposo?",
                "¿Se aplican controles de acceso robustos para garantizar que solo usuarios autorizados puedan acceder al sistema?",
                "¿El equipo de desarrollo y operaciones recibe capacitaciones regulares en prácticas seguras de desarrollo?",
                "¿Se han documentado y probado políticas específicas para la gestión de incidentes de seguridad?",
                "¿El producto está configurado para detectar y notificar intentos de acceso no autorizado?",
                "¿El cliente participa en la validación de las medidas de seguridad implementadas antes del despliegue?",
                "¿Se evalúan periódicamente las políticas y prácticas de seguridad para garantizar su cumplimiento y efectividad?",
            ],
            "Tiempo de Respuesta": [
                "¿Se han establecido tiempos de respuesta máximos aceptables para el producto?",
                "¿Se realizan pruebas de carga para evaluar el rendimiento bajo diferentes escenarios?",
                "¿El producto responde de manera consistente dentro de los tiempos establecidos?",
                "¿Se optimizan consultas y procesos para mejorar el tiempo de respuesta del sistema?",
                "¿El equipo monitoriza los tiempos de respuesta en el entorno de producción?",
                "¿Se registran métricas de rendimiento para analizar la eficiencia del producto?",
                "¿Los usuarios finales están satisfechos con los tiempos de respuesta del producto?",
                "¿Existen planes para optimizar el rendimiento en caso de aumento en la demanda?",
                "¿Se realiza una revisión regular del código para identificar cuellos de botella?",
                "¿El equipo utiliza herramientas especializadas para evaluar y mejorar el rendimiento?",
            ],
            "Adaptabilidad y Flexibilidad": [
                "¿El producto permite incorporar nuevas funcionalidades sin afectar el sistema existente?",
                "¿El diseño modular del producto facilita su adaptación a nuevos requisitos?",
                "¿Los cambios realizados en el sistema son compatibles con las versiones anteriores?",
                "¿Se documentan las dependencias entre componentes para facilitar futuras modificaciones?",
                "¿El equipo realiza pruebas de regresión para validar los cambios implementados?",
                "¿El producto puede escalar horizontal o verticalmente para soportar mayores cargas?",
                "¿Se utiliza una arquitectura flexible (ej., microservicios) para facilitar la adaptabilidad?",
                "¿El cliente puede solicitar cambios sin interrumpir significativamente el cronograma del proyecto?",
                "¿Se mide regularmente la capacidad del producto para adaptarse a nuevos contextos?",
                "¿Existen procesos documentados para gestionar cambios de manera ágil?",
            ],
            "Automatización": [
                "¿El equipo utiliza herramientas para la automatización de pruebas unitarias e integración?",
                "¿Se ha implementado un pipeline de integración y despliegue continuo (CI/CD)?",
                "¿Los procesos de generación de documentación están automatizados?",
                "¿Se utilizan scripts para configurar entornos de desarrollo y producción?",
                "¿Los sistemas en producción están monitorizados automáticamente para detectar anomalías?",
                "¿Las auditorías de seguridad y calidad del código se realizan de forma automatizada?",
                "¿El equipo utiliza herramientas para la gestión de dependencias y actualizaciones del producto?",
                "¿Existen procesos automatizados para la recuperación ante fallos del sistema?",
                "¿La automatización reduce significativamente los tiempos de desarrollo y pruebas?",
                "¿El cliente puede validar entregables de manera más eficiente gracias a la automatización?",
            ],
            "Mejora Continua": [
                "¿El equipo realiza reuniones retrospectivas al final de cada sprint o iteración?",
                "¿Se implementan las sugerencias de mejora identificadas durante las retrospectivas?",
                "¿Se recopilan métricas de desempeño para evaluar y mejorar los procesos del proyecto?",
                "¿El equipo participa regularmente en capacitaciones para mejorar sus habilidades?",
                "¿Se adoptan nuevas tecnologías o metodologías para optimizar el desarrollo?",
                "¿Se registra un historial de todas las mejoras implementadas en el proyecto?",
                "¿El cliente proporciona retroalimentación que se utiliza para mejorar futuros ciclos de desarrollo?",
                "¿Se establecen objetivos de mejora específicos al inicio de cada fase del proyecto?",
                "¿El equipo evalúa el impacto de las mejoras implementadas en el proyecto?",
                "¿Existen procesos para compartir las lecciones aprendidas con otros equipos o proyectos?",
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
