module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // To add a user
  router.post("/", users.create);

  router.get("/", users.findAll);

  // Update a user with id
  router.put("/:email;", users.update);

  // Delete a user with id
  router.delete("/:email", users.delete);
  // To find a user by email
  router.get("/:email", users.findOne);
  // get counts of users by roles
  router.get("/counts/:role", users.countUsersByRole);

  app.use("/api/users", router);
};
