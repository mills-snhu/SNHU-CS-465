const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

//define route for trips endpoint
router
   .route('/trips')
   .get(tripsController.tripsList) //GET method routes triplist
   .post(tripsController.tripsAddTrip); //POST method adds a Trip
   
router
   .route('/trips/:tripCode')
   .get(tripsController.tripsFindByCode)
   .put(tripsController.tripsUpdateTrip);
   

module.exports = router;
