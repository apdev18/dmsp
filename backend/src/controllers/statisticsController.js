const SuratPaksa = require('../models/SuratPaksa');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalSuratPaksa = await SuratPaksa.countDocuments();

    const tunggakan = await SuratPaksa.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$tunggakan' }
        }
      }
    ]);

    const sinkronisasi = await SuratPaksa.aggregate([
      {
        $group: {
          _id: '$sistem',
          count: { $sum: 1 }
        }
      }
    ]);

    const mendekatiDaluwarsa = await SuratPaksa.countDocuments({
      sisaHari: { $lte: 180, $gte: 0 }
    });

    const statusCount = await SuratPaksa.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    let persentaseSinkronisasi = 0;
    if (sinkronisasi.length > 0) {
      const coretax = sinkronisasi.find(s => s._id === 'Coretax');
      if (coretax) {
        persentaseSinkronisasi = ((coretax.count / totalSuratPaksa) * 100).toFixed(1);
      }
    }

    res.status(200).json({
      success: true,
      data: {
        totalSuratPaksa,
        tunggakan: tunggakan[0]?.total || 0,
        persentaseSinkronisasi: parseFloat(persentaseSinkronisasi),
        mendekatiDaluwarsa,
        statusDistribution: statusCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get trend data (SIDJP vs Coretax per bulan)
exports.getTrendData = async (req, res) => {
  try {
    const trend = await SuratPaksa.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$tanggalTerbit' },
            month: { $month: '$tanggalTerbit' },
            sistem: '$sistem'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: trend
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get status distribution
exports.getStatusDistribution = async (req, res) => {
  try {
    const distribution = await SuratPaksa.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: distribution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get tunggakan per tahun
exports.getTunggakanPerTahun = async (req, res) => {
  try {
    const tunggakan = await SuratPaksa.aggregate([
      {
        $group: {
          _id: { $year: '$tanggalTerbit' },
          totalTunggakan: { $sum: '$tunggakan' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: tunggakan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
