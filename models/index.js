"use strict";

const fs = require("fs"); // Librería para trabajar con el sistema de archivos
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development"; // Configuración de entorno
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

// Cargar todos los modelos en la carpeta actual
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

// Configurar las asociaciones de los modelos
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize; // Instancia de Sequelize
db.Sequelize = Sequelize; // Tipos de datos de Sequelize

// Inicialización de catálogos
db.sequelize.sync({ alter: true }).then(async () => {
    try {
        console.log("Sincronización de base de datos exitosa.");

        // Inicializar catálogos solo si están vacíos
        if (db.checklist) {
            const count = await db.checklist.count(); // Verificar si ya existen datos
            if (count === 0) {
                await db.checklist.initializeDefaults();
                console.log("Catálogo 'checklist' inicializado.");
            } else {
                console.log("Catálogo 'checklist' ya inicializado.");
            }
        }

        if (db.pregunta_checklist) {
            const count = await db.pregunta_checklist.count(); // Verificar si ya existen datos
            if (count === 0) {
                await db.pregunta_checklist.initializeDefaults(db);
                console.log("Catálogo 'pregunta_checklist' inicializado.");
            } else {
                console.log("Catálogo 'pregunta_checklist' ya inicializado.");
            }
        }

        if (db.nivel_madurez) {
            const count = await db.nivel_madurez.count(); // Verificar si ya existen datos
            if (count === 0) {
                await db.nivel_madurez.initializeDefaults(db);
                console.log("Catálogo 'nivel_madurez' inicializado.");
            } else {
                console.log("Catálogo 'nivel_madurez' ya inicializado.");
            }
        }

        console.log("Catálogos verificados e inicializados correctamente.");
    } catch (error) {
        console.error("Error durante la inicialización de catálogos:", error);
    }
}).catch((error) => console.error("Error al sincronizar la base de datos:", error));

module.exports = db;
