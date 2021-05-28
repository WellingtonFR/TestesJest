const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("Hello new app with jest");
});

module.exports = routes;
