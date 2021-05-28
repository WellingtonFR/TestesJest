const express = require("express");

class AppController {
  constructor() {
    this.express = express();

    this.middleware();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes/routes"));
  }
}

module.exports = new AppController().express;
