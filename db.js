const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:Onetwo34*@localhost:5432/animal-server");

module.exports = db;