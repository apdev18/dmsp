const SuratPaksa = require('../models/SuratPaksa');

// Get all surat paksa dengan filter dan pagination
exports.getAllSuratPaksa = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sistem, kpp, search } = req.query;

    const query = {};

    if (status) query.status = status;
    if (sistem) query.sistem = sistem;
    if (kpp) query.kpp = kpp;
    if (search) {
      query.$or = [
        { nomorSuratPaksa: { $regex: search, $options: 'i' } },
        { namaWajibPajak: { $regex: search, $options: 'i' } },
        { npwp: { $regex: search, $options: 'i' } }
      ];
    }

    const suratPaksa = await SuratPaksa.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ tanggalDaluwarsa: 1 });

    const count = await SuratPaksa.countDocuments(query);

    res.status(200).json({
      success: true,
      count: suratPaksa.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: suratPaksa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get surat paksa by ID
exports.getSuratPaksaById = async (req, res) => {
  try {
    const suratPaksa = await SuratPaksa.findById(req.params.id);

    if (!suratPaksa) {
      return res.status(404).json({
        success: false,
        message: 'Surat Paksa tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: suratPaksa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create surat paksa
exports.createSuratPaksa = async (req, res) => {
  try {
    console.log('Received body:', req.body);
    const suratPaksa = await SuratPaksa.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Surat Paksa berhasil dibuat',
      data: suratPaksa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update surat paksa
exports.updateSuratPaksa = async (req, res) => {
  try {
    const suratPaksa = await SuratPaksa.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!suratPaksa) {
      return res.status(404).json({
        success: false,
        message: 'Surat Paksa tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Surat Paksa berhasil diupdate',
      data: suratPaksa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete surat paksa
exports.deleteSuratPaksa = async (req, res) => {
  try {
    const suratPaksa = await SuratPaksa.findByIdAndDelete(req.params.id);

    if (!suratPaksa) {
      return res.status(404).json({
        success: false,
        message: 'Surat Paksa tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Surat Paksa berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get surat paksa mendekati daluwarsa
exports.getSuratPaksaMendekatiDaluwarsa = async (req, res) => {
  try {
    const { days = 180 } = req.query;

    const suratPaksa = await SuratPaksa.find({
      sisaHari: { $lte: days, $gte: 0 }
    }).sort({ sisaHari: 1 });

    res.status(200).json({
      success: true,
      count: suratPaksa.length,
      data: suratPaksa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
