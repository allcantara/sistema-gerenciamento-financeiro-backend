const { Router } = require("express");
const authMiddleware = require("./app/middlewares/auth");
const { login } = require("./app/controllers/SessionController");

const {
  store: storeUser,
  showReport,
} = require("./app/controllers/UserController");

const {
  store: storeSale,
  delete: deleteSale,
  show: showSale,
  index: indexSale,
  update: updateSale,
} = require("./app/controllers/SaleController");

const {
  update: updateTaxe,
  index: indexTaxes,
} = require("./app/controllers/TaxeController");

const {
  ValidationSaleCreate,
  ValidationSaleUpdate,
  ValidationSaleShow,
  ValidationSaleIndex,
  ValidationSaleDelete,
  ValidateSession,
  ValidateReport,
  ValidationTaxeIndex,
  ValidationTaxesPayment,
  ValidateUserCreate,
} = require("./app/validators");

const routes = Router();

routes.post("/users", ValidateUserCreate, storeUser);
routes.post("/login", ValidateSession, login);

routes.use(authMiddleware);

routes.post("/sales", ValidationSaleCreate, storeSale);
routes.get("/sales", ValidationSaleIndex, indexSale);
routes.get("/sales/:id", ValidationSaleShow, showSale);
routes.delete("/sales/:id", ValidationSaleDelete, deleteSale);
routes.put("/sales/:id", ValidationSaleUpdate, updateSale);

routes.put("/taxes/:id", ValidationTaxesPayment, updateTaxe);
routes.get("/taxes", ValidationTaxeIndex, indexTaxes);

routes.get("/report/:id", ValidateReport, showReport);

module.exports = routes;
