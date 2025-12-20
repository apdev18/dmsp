const KPP = require('../models/KPP');
const SuratPaksa = require('../models/SuratPaksa');

// Get all KPP
exports.getAllKPP = async (req, res) => {
  try {
    const kppList = await KPP.find();

    res.status(200).json({
      success: true,
      count: kppList.length,
      data: kppList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get KPP by ID
exports.getKPPById = async (req, res) => {
  try {
    const kpp = await KPP.findById(req.params.id);

    if (!kpp) {
      return res.status(404).json({
        success: false,
        message: 'KPP tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: kpp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create KPP
exports.createKPP = async (req, res) => {
  try {
    const kpp = await KPP.create(req.body);

    res.status(201).json({
      success: true,
      message: 'KPP berhasil dibuat',
      data: kpp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update KPP
exports.updateKPP = async (req, res) => {
  try {
    const kpp = await KPP.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!kpp) {
      return res.status(404).json({
        success: false,
        message: 'KPP tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'KPP berhasil diupdate',
      data: kpp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete KPP
exports.deleteKPP = async (req, res) => {
  try {
    const kpp = await KPP.findByIdAndDelete(req.params.id);

    if (!kpp) {
      return res.status(404).json({
        success: false,
        message: 'KPP tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'KPP berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get KPP stats untuk heat map
exports.getKPPStats = async (req, res) => {
  try {
    const stats = await SuratPaksa.aggregate([
      {
        $group: {
          _id: '$kpp',
          totalSuratPaksa: { $sum: 1 },
          totalTunggakan: { $sum: '$tunggakan' },
          selesai: {
            $sum: { $cond: [{ $eq: ['$status', 'Selesai'] }, 1, 0] }
          }
        }
      },
      {
        $addFields: {
          persentaseSelesai: {
            $multiply: [
              { $divide: ['$selesai', '$totalSuratPaksa'] },
              100
            ]
          }
        }
      }
    ]);

    const kppWithStats = await Promise.all(
      stats.map(async (stat) => {
        const kpp = await KPP.findOne({ namaKpp: stat._id });
        return {
          ...stat,
          koordinat: kpp?.koordinat || null,
          provinsi: kpp?.provinsi || null
        };
      })
    );

    res.status(200).json({
      success: true,
      count: kppWithStats.length,
      data: kppWithStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
