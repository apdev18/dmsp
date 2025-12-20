const mongoose = require('mongoose');

const suratPaksaSchema = new mongoose.Schema({
  nomorSuratPaksa: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  npwp: {
    type: String,
    required: true,
    trim: true
  },
  namaWajibPajak: {
    type: String,
    required: true,
    trim: true
  },
  tunggakan: {
    type: Number,
    required: true,
    min: 0
  },
  tanggalTerbit: {
    type: Date,
    required: true
  },
  tanggalDaluwarsa: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Selesai', 'Dalam Proses SPMP', 'Potensi Daluwarsa'],
    default: 'Dalam Proses SPMP'
  },
  kpp: {
    type: String,
    required: true
  },
  sistem: {
    type: String,
    enum: ['SIDJP', 'Coretax'],
    required: true
  },
  jurusita: {
    nama: String,
    nip: String
  },
  timeline: [{
    tanggal: {
      type: Date,
      default: Date.now
    },
    aktivitas: String,
    catatan: String
  }],
  prioritas: {
    type: String,
    enum: ['Critical', 'Warning', 'Safe'],
    default: 'Safe'
  },
  sisaHari: Number
}, {
  timestamps: true
});

// Hitung sisa hari sebelum daluwarsa
suratPaksaSchema.pre('save', function(next) {
  const today = new Date();
  const diffTime = this.tanggalDaluwarsa - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  this.sisaHari = diffDays;

  if (diffDays < 0) {
    this.prioritas = 'Critical';
    this.status = 'Potensi Daluwarsa';
  } else if (diffDays <= 180) {
    this.prioritas = 'Critical';
  } else if (diffDays <= 365) {
    this.prioritas = 'Warning';
  } else {
    this.prioritas = 'Safe';
  }

  next();
});

module.exports = mongoose.model('SuratPaksa', suratPaksaSchema);
