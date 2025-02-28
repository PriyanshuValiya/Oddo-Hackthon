const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  balance: { type: mongoose.Types.Decimal128, required: true },
  isDefault: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Account", AccountSchema);
