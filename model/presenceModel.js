const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let presence = new Schema(
  {
    id: {
      type: Number,
    },
    nom: {
      type: String,
    }, 
    prenom: {
      type: String,
    }, 
    partenaire: {
      type: String,
    }, 
    couple: {
      type: String,
    },
    eglise: {
      type: Boolean,
    },
    party: {
        type: Boolean
    },
    vin: {
        type: Boolean
    },
    events : [
      
    ]
  },
  {
    collection: "listeDePresence",
  }
);
module.exports = mongoose.model("presence", presence);