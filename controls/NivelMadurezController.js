"use strict";

var models = require("../models");

class NivelMadurezController {
  async listar(req, res) {
    try {
      var listar = await models.nivel_madurez.findAll({
        attributes: ["nombre", "external_id", "descripcion", "rango_minimo", "rango_maximo"],
      });
      res.json({ msg: "OK!", code: 200, info: listar });
    } catch (error) {
      console.error("Error al listar categorias de checklist");
      res
        .status(500)
        .json({
          msg: "Se produjo un error al listar categorias de checklist",
          code: 500,
          error: error.message,
        });
    }
  }
}

module.exports = NivelMadurezController;
