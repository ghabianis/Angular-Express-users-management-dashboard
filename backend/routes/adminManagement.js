const express = require('express');

const { body } = require('express-validator');

const adminManagementController = require('../controllers/adminManagement');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, adminManagementController.fetchAll);
router.get('/absences', adminManagementController.absences);
router.get('/userscount', adminManagementController.userscount);
router.get('/visitcount', adminManagementController.visitcount);
router.get('/absences/monthly',adminManagementController.monthly);


router.post(
  '/',
  [
    auth,
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('body').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  adminManagementController.postPost
);

router.delete('/:id', auth, adminManagementController.deletePost);

module.exports = router;
