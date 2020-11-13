const express = require('express');
const router = express.Router();
const tourControllers = require('../controllers/toursController');

router.param('id', tourControllers.checkID);
// router.post('createNewTour',tourControllers.CheckPostBody)
router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.CheckBody,tourControllers.createNewTour);
router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
