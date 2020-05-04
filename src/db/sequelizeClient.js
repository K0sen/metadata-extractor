const Sequelize = require('sequelize');

class SequelizeClient extends Sequelize {
  constructor({ database, username, password, port }) {
    super(database, username, password, {
      host: 'localhost',
      dialect: 'postgres',
      port,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        idle: 60000,
        acquire: 60000
      }
    });
  }

  addModel(name, model, params) {
    return this.define(name, model, params);
  }

  async init() {
    return this.sync({ force: false });
  }
}

module.exports = SequelizeClient;
