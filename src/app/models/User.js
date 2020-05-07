// @ts-nocheck
const { Schema, Types, model } = require("mongoose");
const { hash: _hash } = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  totalSale: {
    type: Number,
    default: 0,
  },
  totalProduct: {
    type: Number,
    default: 0,
  },
  totalProfit: {
    type: Number,
    default: 0,
  },
  totalTaxes: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
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

UserSchema.pre("save", async function (next) {
  const hash = await _hash(String(this.password), 10);
  this.password = hash;
  next();
});

const User = model("User", UserSchema);

module.exports = User;
