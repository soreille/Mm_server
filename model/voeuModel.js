const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let voeu = new Schema(
  {
    voeu: {
      type: String,
    }, nom: {
      type: String,
    }
  },
  { 
    database: "M-M",
    collection: "listeDeVoeux",
   
  }
);
module.exports = mongoose.model("voeu", voeu);