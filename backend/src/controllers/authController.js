const User = require('../models/User');

// Login user
exports.login = async (req, res) => {
  try {
    const { nip, password } = req.body;

    if (!nip || !password) {
      return res.status(400).json({
        success: false,
        message: 'NIP dan password wajib diisi'
      });
    }

    const user = await User.findOne({ nip }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'NIP atau password salah'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'NIP atau password salah'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Akun Anda tidak aktif'
      });
    }

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user._id,
        nama: user.nama,
        nip: user.nip,
        email: user.email,
        role: user.role,
        kpp: user.kpp
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

// Logout user
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout berhasil'
  });
};

// Get current logged in user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
