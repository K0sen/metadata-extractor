module.exports = {
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  pathToBookFolders: process.env.PATH_TO_BOOKS,
};
