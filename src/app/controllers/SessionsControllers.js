const { User } = require("../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    return res.json({
      user,
      token: user.gerarToken(),
    });
  }
}

module.exports = new SessionController();
