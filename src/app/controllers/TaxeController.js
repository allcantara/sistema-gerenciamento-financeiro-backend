const User = require("../models/User");
const Report = require("../models/Report");
const Taxe = require("../models/Taxe");

module.exports = {
  async store(body) {
    try {
      const { total, date, isTaxes, sale_id, user_id } = body;

      const tax = 6;
      const percent = tax / 100;
      const data = {
        total,
        date,
        tax,
        taxeSale: total - (total - total * percent),
        isTaxes,
        sale_id,
        user_id,
      };

      await Taxe.create(data);
      return;
    } catch (error) {
      console.log(error);
      return { message: "Falha ao cadastrar imposto!", error };
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const taxe = await Taxe.findById(id);
      if (!taxe)
        return res.status(400).json({ message: "Imposto não encontrado!" });

      const { isTaxes, sale_id, user_id } = req.body;

      const report = await Report.findOne({ sale_id });
      const user = await User.findById(user_id);
      user.totalTaxes += report.totalTaxes;
      await user.save();

      taxe.isTaxes = isTaxes;
      await taxe.save();

      return res.json(taxe);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha na requisição!", error });
    }
  },

  async index(req, res) {
    try {
      const taxe = await Taxe.find();
      return res.status(200).send(taxe);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha na requisição!", error });
    }
  },
};
