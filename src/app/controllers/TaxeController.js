const Sale = require("../models/Sale");
const Taxe = require("../models/Taxe");

module.exports = {
  async store(body) {
    try {
      const { total, date, isTaxes, sale_id } = body;

      const tax = 0.06;
      const data = {
        total,
        date,
        tax,
        taxeSale: total * tax,
        isTaxes,
        sale_id,
      };

      const taxe = await Taxe.create(data);
      return taxe;
    } catch (error) {
      console.log(error);
      return { message: "Falha ao cadastrar imposto!", error };
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!(await Taxe.findById(id)))
        return res.status(400).json({ message: "Imposto não encontrado!" });

      const { isTaxes } = req.body;
      const data = { isTaxes };

      const taxe = await Taxe.findByIdAndUpdate(
        id,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );

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
