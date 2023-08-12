const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let cadeau = new Schema(
  {
    id: {
      type: Number,
    },
    nom: {
      type: String,
    },
    qtite: {
      type: Number,
    },
  },
  {
    collection: "listeDeCadeaux",
  }
);
module.exports = mongoose.model("cadeau", cadeau);