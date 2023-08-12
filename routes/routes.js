const express = require("express");
const router = express.Router();
const voeuModel = require("../model/voeuModel");
const cadeauModel = require("../model/cadeauModel");
const presenceModel = require("../model/presenceModel");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://soreille:HL6&j5K9i9K4E.A@cluster0.dvs2zvu.mongodb.net/';


// CORS OPTIONS
var whitelist = ["http://localhost:8100", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};

// CREATE cadeau
router.route("/create-cadeau").post(async (req, res, next) => {
  await cadeauModel.create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// CREATE voeu
router.route("/create-voeu").post(async (req, res, next) => {
    await voeuModel.create(req.body)
      .then((result) => {
        console.log('mon voeu', req.body);
        res.json({
          data: result,
          message: "Data successfully added!",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });


  // CREATE Presence
router.route("/create-presence").post(async (req, res, next) => {
  console.log('je participe a ', req.body);
  let presence;
  let eglise ;
  let vin;
  let party;

 if(req.body){
  eglise = req.body.events.find(elt => elt == 'Mariage religieux');
   vin = req.body.events.find(elt => elt == "Vin d'honneur");
   party = req.body.events.find(elt => elt =='Soiree Dansante');
   all = req.body.events.find(elt => elt =='all');
 }

  if(eglise){
    messe = true
    console.log('messe detected')
  }else{
    messe = false
    console.log(' no messe detected')
  }

  if(vin){
    boire = true
    console.log('boire detected')
  }else{
    boire = false
    console.log(' no boire detected')
  };

  if(party){
    fete = true
    console.log('fete detected')
  }else{
    fete = false
    console.log('no fete detected')
  }; 
  
  if(all){
  messe = true
  boire = true
  fete = true
  console.log('messe fete et boire detected')
}
  presence= { nom: req.body.nom, prenom:req.body.prenom, eglise: messe, vin: boire, party: fete, couple: req.body.couple, partenaire: req.body.partenaire, events: req.body.events}

  await presenceModel.create(presence)
      .then((result) => { 
        res.json({
          data: result,
          message: "Data successfully added!",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });

// GET SINGLE cadeau
router.route("/get-cadeau/:id").get(async (req, res, next) => {
  await cadeauModel.findById(req.params.id, req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});


// GET ALL cadeaux
router.route("/cadeaux", cors(corsOptionsDelegate)).get(async (req, res, next) => {
  await cadeauModel.find()
    .then((result) => {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      return next(err);
    });
});


// UPDATE Cadeau qtite
router.route("/update-cadeau/:id").put(async (req, res, next) => {
  console.log('body', req.body);
  cadeau = {id: req.body.id, nom: req.body.nom, qtite: req.body.qtite }
  console.log('id params', req.params.id);
  await cadeauModel.updateOne( {_id : req.body._id} , { $set : { "qtite" : req.body.qtite }})
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}); 


// GET ALL Voeux
router.route("/voeux", cors(corsOptionsDelegate)).get(async (req, res, next) => {
    await voeuModel.find()
      .then((result) => {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        return next(err);
      });
  });



  
module.exports = router;