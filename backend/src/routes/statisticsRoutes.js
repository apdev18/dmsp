const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getTrendData,
  getStatusDistribution,
  getTunggakanPerTahun
} = require('../controllers/statisticsController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/trend', getTrendData);
router.get('/status-distribution', getStatusDistribution);
router.get('/tunggakan-per-tahun', getTunggakanPerTahun);

module.exports = router;
