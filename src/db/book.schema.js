const Sequelize = require('sequelize');

module.exports = {
  title: {
    type: Sequelize.TEXT
  },
  author: {
    type: Sequelize.STRING
  },
  publisher: {
    type: Sequelize.STRING
  },
  publicationDate: {
    type: Sequelize.STRING
  },
  language: {
    type: Sequelize.STRING
  },
  licenseRights: {
    type: Sequelize.STRING
  },
}
