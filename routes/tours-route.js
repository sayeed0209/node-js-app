const express = require('express');
const router = express.Router();
const tourConrtollers = require('../controllers/toursController');

router
  .route('/')
  .get(tourConrtollers.getAllTours)
  .post(tourConrtollers.createNewTour);
router
  .route('/:id')
  .get(tourConrtollers.getTour)
  .patch(tourConrtollers.updateTour)
  .delete(tourConrtollers.deleteTour);

module.exports = router;
