const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  amount: { type: mongoose.Types.Decimal128, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  lastAlertSent: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Budget", BudgetSchema);
