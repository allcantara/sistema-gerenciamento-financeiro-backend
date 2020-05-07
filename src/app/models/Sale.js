// @ts-nocheck
const { Schema, Types, model } = require("mongoose");

const SaleSchema = new Schema({
  distributor: {
    type: String,
    required: true,
  },
  valueUnitary: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  taxeSale: {
    type: Number,
    required: true,
  },
  isTaxes: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number,
    required: true,
  },
  valueLote: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
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

const Sale = model("Sale", SaleSchema);

module.exports = Sale;
