// Grafik Garis - Tren Penerbitan
const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
            {
                label: 'SIDJP (2019-2024)',
                data: [245, 289, 312, 267, 298, 276, 254, 301, 289, 267, 243, 198],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8
            },
            {
                label: 'Coretax (2025)',
                data: [null, null, null, null, null, null, null, null, null, null, null, 156],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 8,
                pointHoverRadius: 10
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: { size: 14 },
                    padding: 20
                }
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Jumlah Surat Paksa',
                    font: { size: 12, weight: 'bold' }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Bulan',
                    font: { size: 12, weight: 'bold' }
                },
                grid: {
                    display: false
                }
            }
        }
    }
});

// Grafik Pie - Status
const pieCtx = document.getElementById('pieChart').getContext('2d');
new Chart(pieCtx, {
    type: 'doughnut',
    data: {
        labels: ['Selesai (Lunas)', 'Dalam Proses SPMP', 'Potensi Daluwarsa'],
        datasets: [{
            data: [1245, 1459, 143],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
            borderWidth: 3,
            borderColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: { size: 13 },
                    padding: 15,
                    usePointStyle: true
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    }
});

// Grafik Batang - Tunggakan
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Tunggakan (Miliar Rp)',
            data: [8.5, 12.3, 9.7, 7.2, 5.8, 4.1, 2.4],
            backgroundColor: ['#ef4444', '#ef4444', '#f59e0b', '#3b82f6', '#3b82f6', '#3b82f6', '#10b981'],
            borderWidth: 0,
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return 'Rp ' + context.parsed.y.toFixed(1) + ' Miliar';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tunggakan (Miliar Rp)',
                    font: { size: 12, weight: 'bold' }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tahun Penerbitan',
                    font: { size: 12, weight: 'bold' }
                },
                grid: {
                    display: false
                }
            }
        }
    }
});

// Grafik Gauge - Target
const gaugeCtx = document.getElementById('gaugeChart').getContext('2d');
new Chart(gaugeCtx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [72.5, 27.5],
            backgroundColor: ['#10b981', '#e5e7eb'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        cutout: '75%'
    }
});

// Fungsi download grafik individual
function downloadChart(chartId, filename) {
    const canvas = document.getElementById(chartId);
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename + '.png';
    link.href = url;
    link.click();
}

// Fungsi download full dashboard
function downloadFullDashboard() {
    const dashboard = document.querySelector('.dashboard');
    html2canvas(dashboard, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
    }).then(canvas => {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'Dashboard_Monitoring_Surat_Paksa_Full.png';
        link.href = url;
        link.click();
    });
}

// Animasi load
window.addEventListener('load', () => {
    document.querySelectorAll('.stat-card, .chart-container, .alert-section').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
