const db = require("../models");
const users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new users
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a user
  const usersMetaData = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    id: req.body.id,
    password: req.body.password,
    role: req.body.role,
  };
  console.log(usersMetaData);
  await users
    .create(usersMetaData)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

//TO fetch all user records
exports.findAll = async (req, res) => {
  const name = req.query.name;
  await users
    .findAll({ attributes: ["id", "name", "email", "gender", "role"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users",
      });
    });
};

exports.update = (req, res) => {
  const email = req.params.email;
  users
    .update(req.body, {
      where: {email: email },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with email=${email}. Maybe user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with email=" + email,
      });
    });
};

exports.delete = (req, res) => {
  const email = req.params.email;
  users
    .destroy({
      where: { email: email},
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "user was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe user was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

exports.findOne = async (req, res) => {
  const email = req.params.email;
  await users
    .findAll({
      where: { email: email },
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: `Cannot find users with id=${email}.`,
        });
      }
    })
    .catch((err) => {
      res.send({
        message: false,
      });
    });
};

exports.countUsersByRole = async (req, res) => {
  const role = req.params.role;
  await users
    .count({
      where: {
        role: role,
      },
    })
    .then((data) => {
      console.log(data);
      res.send(`${data}`);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
