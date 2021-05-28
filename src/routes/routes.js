const routes = require("express").Router();
const { User } = require("../app/models");

// User.create({
//   name: "Wellington",
//   email: "wellington.rocha@luizalabs.com",
//   password_hash: "ah@(*@9HJh3h@*@&*",
// });

routes.get("/", (req, res) => {
  res.send({ message: "Hello new app with jest" });
});

module.exports = routes;
