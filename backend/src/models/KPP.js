const mongoose = require('mongoose');

const kppSchema = new mongoose.Schema({
  kodeKpp: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  namaKpp: {
    type: String,
    required: true,
    trim: true
  },
  alamat: {
    type: String,
    trim: true
  },
  provinsi: {
    type: String,
    trim: true
  },
  koordinat: {
    lat: Number,
    lng: Number
  },
  statistics: {
    totalSuratPaksa: {
      type: Number,
      default: 0
    },
    totalTunggakan: {
      type: Number,
      default: 0
    },
    persentaseSelesai: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('KPP', kppSchema);
