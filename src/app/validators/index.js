const ValidationSaleCreate = require("../validators/Sale/saleCreate");
const ValidationSaleUpdate = require("../validators/Sale/saleUpdate");
const ValidationSaleShow = require("../validators/Sale/saleShow");
const ValidationSaleIndex = require("../validators/Sale/saleIndex");
const ValidationSaleDelete = require("../validators/Sale/saleDelete");
const ValidateSession = require("../validators/Session");
const ValidateReport = require("../validators/Report");
const ValidationTaxeIndex = require("../validators/Taxes/taxeIndex");
const ValidationTaxesPayment = require("../validators/Taxes/taxePayment");
const ValidateUserCreate = require("../validators/User");

module.exports = {
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
};
