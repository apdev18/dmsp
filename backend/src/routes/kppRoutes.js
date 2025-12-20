const express = require('express');
const router = express.Router();
const {
  getAllKPP,
  getKPPById,
  createKPP,
  updateKPP,
  deleteKPP,
  getKPPStats
} = require('../controllers/kppController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getAllKPP)
  .post(protect, authorize('admin'), createKPP);

router.route('/stats')
  .get(protect, getKPPStats);

router.route('/:id')
  .get(protect, getKPPById)
  .put(protect, authorize('admin'), updateKPP)
  .delete(protect, authorize('admin'), deleteKPP);

module.exports = router;
