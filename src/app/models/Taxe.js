// @ts-nocheck
const { Schema, Types, model } = require("mongoose");

const TaxeSchema = new Schema({
  sale_id: {
    type: Types.ObjectId,
    ref: "Sale",
    required: true,
  },
  user_id: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  tax: {
    type: Number,
    default: 0.06,
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
  date: {
    type: Date,
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

const Taxe = model("Taxe", TaxeSchema);

module.exports = Taxe;
