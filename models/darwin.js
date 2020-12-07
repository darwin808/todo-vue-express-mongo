const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DarwinSchema = new Schema({
  lname: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  crush: {
    type: String,
    required: true,
  },
});

const Darwin = mongoose.model("darwin", DarwinSchema);

module.exports = Darwin;
