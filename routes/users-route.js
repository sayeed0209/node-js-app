const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// get all users

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser);
router
  .route('/:id')
  .get(userController.getUserbyId)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
