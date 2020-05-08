const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      const { name, surname, email, password } = req.body;
      const data = { name, surname, email, password };
      const user = await User.create(data);
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha ao cadastrar!", error });
    }
  },

  async showReport(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user)
        return res.status(400).send({ message: "Usuário não encontrado!" });

      const data = {
        totalProfit: user.totalProfit,
        totalProducts: user.totalProduct,
        totalSales: user.totalSale,
        totalTaxes: user.totalTaxes,
      };

      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha na requisição!", error });
    }
  },
};
