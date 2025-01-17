const { resultado_checklist, pregunta_checklist, proyecto } = require('../models');

class ResultadoChecklistController {
    async guardarResultados(req, res) {
        try {
            const { idProyecto, respuestas } = req.body;

            console.log('idProyecto:', idProyecto);

            // Buscar el proyecto por external_id
            const proyectoExiste = await proyecto.findOne({
                where: { external_id: idProyecto }
            });

            if (!proyectoExiste) {
                return res.status(404).json({ 
                    msg: 'Proyecto no encontrado', 
                    code: 404 
                });
            }

            const resultados = [];
            for (const respuesta of respuestas) {
                const { idPregunta, respuestaSeleccionada } = respuesta;

                // Verificar si la pregunta existe
                const preguntaExiste = await pregunta_checklist.findByPk(idPregunta);
                if (!preguntaExiste) {
                    return res.status(404).json({
                        msg: `Pregunta con id ${idPregunta} no encontrada`,
                        code: 404
                    });
                }

                // Crear el resultado del checklist
                const resultado = await resultado_checklist.create({
                    id_proyecto: proyectoExiste.id, // Usar el ID del proyecto encontrado
                    id_pregunta_checklist: idPregunta,
                    respuesta: respuestaSeleccionada
                });

                resultados.push(resultado);
            }

            return res.status(201).json({
                msg: 'Resultados guardados correctamente',
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
}

module.exports = ResultadoChecklistController;
