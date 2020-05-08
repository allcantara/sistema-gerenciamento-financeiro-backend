const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authConfig = require("../../config/auth.json");

function generateToken({ id }) {
  return jwt.sign({ id }, authConfig.secret, {
    expiresIn: 7200,
  });
}

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(202).send({ message: "Preencha todos os campos..." });

      const user = await User.findOne({ email }).select("+password");

      if (!user)
        return res.status(202).send({ message: "Este usuário não existe!" });

      if (!(await user.matchesPassword(password)))
        return res.status(202).send({ message: "Senha incorreta!" });

      user.password = undefined;

      return res.status(200).send({
        user,
        token: generateToken(user._id),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha na autenticação!", error });
    }
  },
};
