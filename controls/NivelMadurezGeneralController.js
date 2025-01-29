"use strict";

var models = require("../models");

class NivelMadurezGeneralController {

  async obtenerNivelMadurezGeneral(req, res) {
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

      const nivelMadurezGeneral = await models.nivel_madurez_general.findOne({
        where: { id_proyecto: id_proyecto },
        attributes: ["nivel_general"],
        include: [
          {
            model: models.nivel_madurez,
            as: "nivel_madurez",
            attributes: ["nombre", "descripcion"],
          },
        ],
      });

      if (!nivelMadurezGeneral) {
        return res.status(404).json({
          msg: "No hay nivel de madurez general calculado para este proyecto",
          code: 404,
        });
      }

      res.json({
        msg: "Nivel de madurez general obtenido con éxito",
        code: 200,
        info: {
          nivel_general: nivelMadurezGeneral.nivel_general,
          nivel_madurez: nivelMadurezGeneral.nivel_madurez
            ? nivelMadurezGeneral.nivel_madurez.nombre
            : "No determinado",
          descripcion: nivelMadurezGeneral.nivel_madurez
            ? nivelMadurezGeneral.nivel_madurez.descripcion
            : "Sin información",
        },
      });
    } catch (error) {
      console.error("Error al obtener el nivel de madurez general", error);
      res.status(500).json({
        msg: "Se produjo un error al obtener el nivel de madurez general",
        code: 500,
        error: error.message,
      });
    }
  }

  async calcularNivelMadurezGeneral(req, res) {
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

      const resultadosCategorias = await models.resultado_categoria.findAll({
        where: { id_proyecto: id_proyecto },
        attributes: ["porcentaje_cumplimiento"],
        include: [
          {
            model: models.checklist,
            as: "categoria",
            attributes: ["titulo", "external_id", "peso"],
          },
        ],
      });

      if (resultadosCategorias.length === 0) {
        return res.status(404).json({
          msg: "No hay resultados almacenados para este proyecto",
          code: 404,
        });
      }

      let sumatoriaPC_Wi = 0;
      let sumatoriaWi = 0;

      resultadosCategorias.forEach((resultado) => {
        const porcentajeCumplimiento = parseFloat(resultado.porcentaje_cumplimiento);
        const peso = parseInt(resultado.categoria.peso);

        sumatoriaPC_Wi += porcentajeCumplimiento * peso;
        sumatoriaWi += peso;
      });

      const NG = sumatoriaWi > 0 ? sumatoriaPC_Wi / sumatoriaWi : 0;

      // Buscar el nivel de madurez correspondiente al NG
      const nivelMadurez = await models.nivel_madurez.findOne({
        where: {
          rango_minimo: { [models.Sequelize.Op.lte]: NG },
          rango_maximo: { [models.Sequelize.Op.gte]: NG },
        },
        attributes: ["id", "nombre", "descripcion"],
      });

      let resultadoNivel = await models.nivel_madurez_general.findOne({
        where: { id_proyecto: id_proyecto },
      });

      const idNivelMadurez = nivelMadurez ? nivelMadurez.id : null;

      if (!resultadoNivel) {
        // Crear el registro si no existe
        resultadoNivel = await models.nivel_madurez_general.create({
          id_proyecto: id_proyecto,
          nivel_general: NG.toFixed(2),
          id_nivel_madurez: idNivelMadurez,
        });
      } else {
        // Actualizar el registro existente
        await resultadoNivel.update({
          nivel_general: NG.toFixed(2),
          id_nivel_madurez: idNivelMadurez,
        });
      }

      res.json({
        msg: "Nivel de madurez general calculado exitosamente",
        code: 200,
        info: {
          nivel_general: NG.toFixed(2),
          nivel_madurez: nivelMadurez ? nivelMadurez.nombre : "No determinado",
          descripcion: nivelMadurez ? nivelMadurez.descripcion : "Sin información",
        },
      });
    } catch (error) {
      console.error("Error al calcular el nivel de madurez general", error);
      res.status(500).json({
        msg: "Se produjo un error al calcular el nivel de madurez general",
        code: 500,
        error: error.message,
      });
    }
  }

}

module.exports = NivelMadurezGeneralController;
