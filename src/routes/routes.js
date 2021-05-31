const routes = require("express").Router();
const SessionController = require("../app/controllers/SessionsControllers");
const authMiddleware = require("../app/middleware/auth");

routes.get("/", (req, res) => {
  res.send({ message: "Hello new app with jest" });
});

routes.post("/session", SessionController.store);

routes.use(authMiddleware);

routes.get("/painel", (req, res) => {
  return res.send().status(200);
});

module.exports = routes;
