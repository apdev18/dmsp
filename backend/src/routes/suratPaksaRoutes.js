const express = require('express');
const router = express.Router();
const {
  getAllSuratPaksa,
  getSuratPaksaById,
  createSuratPaksa,
  updateSuratPaksa,
  deleteSuratPaksa,
  getSuratPaksaMendekatiDaluwarsa
} = require('../controllers/suratPaksaController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getAllSuratPaksa)
  .post(protect, authorize('admin', 'jurusita'), createSuratPaksa);

router.route('/mendekati-daluwarsa')
  .get(protect, getSuratPaksaMendekatiDaluwarsa);

router.route('/:id')
  .get(protect, getSuratPaksaById)
  .put(protect, authorize('admin', 'jurusita'), updateSuratPaksa)
  .delete(protect, authorize('admin'), deleteSuratPaksa);

module.exports = router;
