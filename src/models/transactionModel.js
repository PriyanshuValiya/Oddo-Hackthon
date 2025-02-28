const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: mongoose.Types.Decimal128, required: true },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  description: { type: String },
  date: { type: Date, default: Date.now },
  category: { type: String },
  receiptUrl: { type: String },
  isRecurring: { type: Boolean, default: false },
  recurringInterval: { type: String },
  nextRecurringDate: { type: Date },
  lastProcessed: { type: Date },
  status: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
