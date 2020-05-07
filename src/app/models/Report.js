// @ts-nocheck
const { Schema, Types, model } = require("mongoose");

const ReportSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    ref: "User",
  },
  sale_id: {
    type: Types.ObjectId,
    ref: "Sales",
  },
  totalProfit: {
    type: Number,
  },
  totalTaxes: {
    type: Number,
  },
  totalSales: {
    type: Number,
  },
  totalProducts: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Report = model("Report", ReportSchema);

module.exports = Report;
