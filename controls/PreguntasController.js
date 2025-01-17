const { checklist, pregunta_checklist } = require('../models');

class PreguntasController {
    async obtenerChecklist(req, res) {
        try {
            const data = await checklist.findAll({
                attributes: ['id', 'titulo', 'external_id'],
                include: {
                    model: pregunta_checklist,
                    as: 'preguntas',
                    attributes: ['id', 'pregunta', 'id_checklist', 'external_id']
                }
            });

            res.status(200).json({ 
                msg: 'OK', 
                code: 200, 
                info: data 
            });
        } catch (error) {
            console.error('Error al obtener el checklist:', error);
            res.status(500).json({ 
                msg: 'Error al obtener el checklist', 
                code: 500, 
                info: error.message 
            });
        }
    }
}

module.exports = PreguntasController;
