const { resultado_checklist, pregunta_checklist, proyecto } = require('../models');

class ResultadoChecklistController {
    async guardarResultados(req, res) {
        try {
            const { idProyecto, respuestas } = req.body;
    
            console.log('idProyecto:', idProyecto);
    
            const proyectoExiste = await proyecto.findOne({
                where: { external_id: idProyecto }
            });
    
            if (!proyectoExiste) {
                return res.status(404).json({
                    msg: 'Proyecto no encontrado',
                    code: 404
                });
            }
    
            const id_proyecto = proyectoExiste.id;
            const resultados = [];
    
            for (const respuesta of respuestas) {
                const { idPregunta, respuestaSeleccionada } = respuesta;
    
                const preguntaExiste = await pregunta_checklist.findByPk(idPregunta);
                if (!preguntaExiste) {
                    return res.status(404).json({
                        msg: `Pregunta con id ${idPregunta} no encontrada`,
                        code: 404
                    });
                }
    
                const registroExistente = await resultado_checklist.findOne({
                    where: {
                        id_proyecto,
                        id_pregunta_checklist: idPregunta
                    }
                });
    
                if (registroExistente) {
                    await registroExistente.update({
                        respuesta: respuestaSeleccionada
                    });
                    resultados.push({
                        id: registroExistente.id,
                        id_proyecto,
                        id_pregunta_checklist: idPregunta,
                        respuesta: respuestaSeleccionada,
                        msg: 'Registro actualizado'
                    });
                } else {
                    const nuevoResultado = await resultado_checklist.create({
                        id_proyecto,
                        id_pregunta_checklist: idPregunta,
                        respuesta: respuestaSeleccionada
                    });
                    resultados.push({
                        id: nuevoResultado.id,
                        id_proyecto,
                        id_pregunta_checklist: idPregunta,
                        respuesta: respuestaSeleccionada,
                        msg: 'Registro creado'
                    });
                }
            }
    
            return res.status(201).json({
                msg: 'Resultados procesados correctamente',
                code: 201,
                info: resultados
            });
        } catch (error) {
            console.error('Error al guardar resultados:', error);
            return res.status(500).json({
                msg: 'Error al guardar los resultados',
                code: 500,
                info: error
            });
        }
    }

    async obtenerPreguntasSeleccionadas(req, res) {
        try {
            const { external_id } = req.params;
    
            const proyectoExiste = await proyecto.findOne({
                where: { external_id }
            });
    
            if (!proyectoExiste) {
                return res.status(404).json({
                    msg: 'Proyecto no encontrado',
                    code: 404
                });
            }
    
            const id_proyecto = proyectoExiste.id;
    
            const preguntasSeleccionadas = await resultado_checklist.findAll({
                where: {
                    id_proyecto,
                    respuesta: 1 
                },
                include: [
                    {
                        model: pregunta_checklist,
                        as: 'pregunta_checklist', 
                        attributes: ['id', 'pregunta', 'id_checklist']
                    }
                ]
            });
    
            if (preguntasSeleccionadas.length === 0) {
                return res.status(404).json({
                    msg: 'No se encontraron preguntas seleccionadas para este proyecto',
                    code: 404
                });
            }
    
            return res.status(200).json({
                msg: 'Preguntas seleccionadas obtenidas correctamente',
                code: 200,
                info: preguntasSeleccionadas
            });
        } catch (error) {
            console.error('Error al obtener preguntas seleccionadas:', error);
            return res.status(500).json({
                msg: 'Error al obtener las preguntas seleccionadas',
                code: 500,
                info: error
            });
        }
    }    
     
}

module.exports = ResultadoChecklistController;
