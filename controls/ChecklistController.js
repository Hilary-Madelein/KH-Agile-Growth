"use strict";

var models = require("../models");

class CheckListController {
  async listar(req, res) {
    try {
      var listar = await models.checklist.findAll({
        attributes: ["titulo", "external_id", "descripcion", "peso", "justificacion_peso"],
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

module.exports = CheckListController;
