const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  title: String,
  noteSummary: String,
  tags: [String],
  backgrounds: {
    type: String,
    default: "#000"
  },
  deletedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Bin = mongoose.model("Bin", binSchema);

module.exports = Bin;
