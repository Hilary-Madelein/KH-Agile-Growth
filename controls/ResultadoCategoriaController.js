"use strict";

const models = require("../models");
const { Op } = require("sequelize");

class ResultadoCategoriaController {
    async obtenerResultadosGuardados(req, res) {
        try {
            const { external_id_proyecto } = req.params;

            const proyecto = await models.proyecto.findOne({
                where: { external_id: external_id_proyecto },
            });

            if (!proyecto) {
                return res.status(404).json({
                    msg: "Proyecto no encontrado",
                    code: 404,
                });
            }

            const id_proyecto = proyecto.id;

            const resultados = await models.resultado_categoria.findAll({
                where: { id_proyecto: id_proyecto },
                attributes: ["porcentaje_cumplimiento"],
                include: [
                    {
                        model: models.checklist,
                        as: "categoria",
                        attributes: ["titulo", "external_id"],
                    },
                    {
                        model: models.nivel_madurez,
                        as: "nivel_madurez",
                        attributes: ["nombre", "descripcion"],
                    },
                ],
            });

            if (resultados.length === 0) {
                return res.status(404).json({
                    msg: "No hay resultados almacenados para este proyecto",
                    code: 404,
                });
            }

            const formattedResults = resultados.map((resultado) => ({
                categoria: resultado.categoria.titulo,
                external_id_categoria: resultado.categoria.external_id,
                porcentaje: resultado.porcentaje_cumplimiento,
                nivel: resultado.nivel_madurez ? resultado.nivel_madurez.nombre : "No determinado",
                descripcion_nivel: resultado.nivel_madurez ? resultado.nivel_madurez.descripcion : "Sin información",
            }));

            res.json({
                msg: "Resultados obtenidos con éxito",
                code: 200,
                info: formattedResults,
            });
        } catch (error) {
            console.error("Error al obtener resultados guardados", error);
            res.status(500).json({
                msg: "Se produjo un error al obtener los resultados",
                code: 500,
                error: error.message,
            });
        }
    }

    async calcularPorcentajePorCategoria(req, res) {
        const transaction = await models.sequelize.transaction();
        try {
            const { external_id_proyecto } = req.params;

            const proyecto = await models.proyecto.findOne({
                where: { external_id: external_id_proyecto },
            });

            if (!proyecto) {
                return res.status(404).json({
                    msg: "El proyecto no fue encontrado en la base de datos.",
                    code: 404,
                });
            }

            const id_proyecto = proyecto.id;

            const categorias = await models.checklist.findAll({
                attributes: ["id", "titulo", "peso"],
            });

            let resultados = [];

            for (const categoria of categorias) {
                const preguntas = await models.pregunta_checklist.findAll({
                    where: { id_checklist: categoria.id },
                    attributes: ["id"],
                });

                const totalPreguntas = preguntas.length;

                if (totalPreguntas === 0) {
                    resultados.push({
                        categoria: categoria.titulo,
                        porcentaje: 0,
                        nivel: "No evaluado",
                    });
                    continue;
                }

                const respuestasCumplidas = await models.resultado_checklist.count({
                    where: {
                        id_proyecto: id_proyecto,
                        respuesta: 1,
                        id_pregunta_checklist: {
                            [Op.in]: preguntas.map((p) => p.id),
                        },
                    },
                });

                const porcentajeCumplimiento = (respuestasCumplidas / totalPreguntas) * 100;

                const nivelMadurez = await models.nivel_madurez.findOne({
                    where: {
                        rango_minimo: { [Op.lte]: porcentajeCumplimiento },
                        rango_maximo: { [Op.gte]: porcentajeCumplimiento },
                    },
                    attributes: ["id", "nombre"],
                });

                let nivelMadurezNombre = "No determinado";
                let idNivelMadurez = null;

                if (nivelMadurez) {
                    nivelMadurezNombre = nivelMadurez.nombre;
                    idNivelMadurez = nivelMadurez.id;
                }

                const registroExistente = await models.resultado_categoria.findOne({
                    where: {
                        id_proyecto: id_proyecto,
                        id_checklist: categoria.id,
                    },
                });

                if (registroExistente) {
                    await registroExistente.update(
                        {
                            porcentaje_cumplimiento: porcentajeCumplimiento.toFixed(2),
                            id_nivel_madurez: idNivelMadurez,
                        },
                        { transaction }
                    );
                } else {
                    await models.resultado_categoria.create(
                        {
                            id_proyecto: id_proyecto,
                            id_checklist: categoria.id,
                            porcentaje_cumplimiento: porcentajeCumplimiento.toFixed(2),
                            id_nivel_madurez: idNivelMadurez,
                        },
                        { transaction }
                    );
                }

                resultados.push({
                    categoria: categoria.titulo,
                    porcentaje: porcentajeCumplimiento.toFixed(2),
                    nivel: nivelMadurezNombre,
                });
            }

            await transaction.commit();
            res.json({
                msg: "Cálculo de porcentaje de cumplimiento por categoría realizado y actualizado con éxito.",
                code: 200,
                info: resultados,
            });
        } catch (error) {
            await transaction.rollback();
            console.error("Error al calcular y actualizar el porcentaje de cumplimiento por categoría", error);
            res.status(500).json({
                msg: "Se produjo un error al calcular o actualizar los resultados.",
                code: 500,
                error: error.message,
            });
        }
    }

}

module.exports = ResultadoCategoriaController;
