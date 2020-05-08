const Sale = require("../models/Sale");
const User = require("../models/User");
const Report = require("../models/Report");
const Taxe = require("../models/Taxe");
const { store: storeTaxe } = require("../controllers/TaxeController");

module.exports = {
  async store(req, res) {
    try {
      const {
        distributor,
        valueUnitary,
        amount,
        taxeSale,
        date,
        user_id,
      } = req.body;

      const user = await User.findById(user_id);

      if (!user)
        return res.status(203).json({ message: "Este usuário não existe!" });

      const unitary = parseFloat(valueUnitary.replace(",", "."));
      let valueLote = unitary * 100;
      let totalProfit = valueLote * amount;
      const data = {
        distributor,
        valueUnitary: unitary,
        amount,
        taxeSale: Number(taxeSale.replace(",", ".")),
        date,
        valueLote,
        total: totalProfit,
        isTaxes: false,
        user_id,
      };

      const sale = await Sale.create(data);

      const percent = sale.taxeSale / 100;
      const totalDesProduct = totalProfit - totalProfit * percent;
      const totalTaxesValue = totalProfit - totalDesProduct * 0.06;
      const totalProfitFinal =
        totalProfit -
        (totalProfit - totalDesProduct) -
        (totalProfit - totalTaxesValue);

      const dataTax = {
        total: totalDesProduct,
        date,
        isTaxes: sale.isTaxes,
        sale_id: sale._id,
        user_id: user._id,
      };
      await storeTaxe(dataTax);

      const dataReport = {
        user_id: sale.user_id,
        sale_id: sale._id,
        totalProfit: totalProfitFinal,
        totalSales: totalProfit,
        totalProducts: totalProfit - totalDesProduct,
        totalTaxes: totalProfit - totalTaxesValue,
      };

      const report = await Report.create(dataReport);

      user.totalProfit += report.totalProfit;
      user.totalSale += report.totalSales;
      // user.totalProduct += report.totalProducts;
      // user.totalTaxes += report.totalTaxes;
      await user.save();

      return res.json({ ...sale });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha ao cadastrar!", error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!(await Sale.findById(id)))
        return res.status(400).json({ message: "Venda não encontrada!" });

      const {
        distributor,
        valueUnitary,
        amount,
        taxeSale,
        date,
        isTaxes,
        user_id,
      } = req.body;

      const user = await User.findById(user_id);

      if (!user)
        return res.status(400).json({ message: "Usuário não encontrado!" });

      const unitary = parseFloat(valueUnitary.replace(",", "."));
      let valueLote = unitary * 100;
      let totalProfit = valueLote * amount;

      const data = {
        distributor,
        valueUnitary: unitary,
        amount,
        taxeSale: Number(taxeSale.replace(",", ".")),
        date,
        valueLote,
        total: totalProfit,
        isTaxes,
        user_id,
      };

      const sale = await Sale.findByIdAndUpdate(
        id,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );

      const report = await Report.findOne({ sale_id: sale._id });
      user.totalProduct += report.totalProducts;

      await user.save();

      return res.json(sale);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha na requisição!", error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const sale = await Sale.findById(id);
      if (!sale)
        return res.status(400).send({ message: "Venda não encontrada!" });

      const user = await User.findOne({ _id: sale.user_id });
      const report = await Report.findOne({ sale_id: sale._id });
      const taxe = await Taxe.findOne({ sale_id: sale._id });

      if (!taxe.isTaxes)
        return res.status(202).json({
          message: "Não é possível excluir: O imposto não está pago...",
        });

      if (!sale.isTaxes)
        return res.status(202).json({
          message:
            "Não é possível excluir: A taxa do distribuidor não está paga...",
        });

      user.totalProduct -= report.totalProducts;
      user.totalProfit -= report.totalProfit;
      user.totalSale -= report.totalSales;
      user.totalTaxes -= report.totalTaxes;

      await user.save();
      await report.remove();
      await taxe.remove();

      await Sale.findByIdAndRemove(id);

      return res
        .status(200)
        .send({ message: "Registro deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha na requisição!", error });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const sale = await Sale.findById(id);

      if (!sale)
        return res.status(400).send({ message: "Venda não encontrada!" });

      return res.status(200).send(sale);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha na requisição!", error });
    }
  },

  async index(req, res) {
    try {
      const sales = await Sale.find();
      return res.status(200).send(sales);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Falha na requisição!", error });
    }
  },
};
