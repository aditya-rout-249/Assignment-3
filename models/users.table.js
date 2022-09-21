const { users } = require(".");
// Defining users table with Sequelize
module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      primarykey: true,
    },
    gender: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  });
  return users;
};
