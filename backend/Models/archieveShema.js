const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema({
  title: String,
  noteSummary: String,
  tags: [String],
  backgrounds: {
    type: String,
    default: "#000"
  }
}, { timestamps: true });

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;
