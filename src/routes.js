const { Router } = require("express");
const authMiddleware = require("./app/middlewares/auth");
const {
  store: storeUser,
  showReport,
} = require("./app/controllers/UserController");
const { login } = require("./app/controllers/SessionController");
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

const routes = Router();

routes.post("/users", storeUser);
routes.post("/login", login);

routes.use(authMiddleware);

routes.post("/sales", storeSale);
routes.get("/sales", indexSale);
routes.get("/sales/:id", showSale);
routes.delete("/sales/:id", deleteSale);
routes.put("/sales/:id", updateSale);

routes.put("/taxes/:id", updateTaxe);
routes.get("/taxes", indexTaxes);

routes.get("/report/:id", showReport);

module.exports = routes;
