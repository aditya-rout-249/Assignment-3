module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "qodes@249",
  DB: "application",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
