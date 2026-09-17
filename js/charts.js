/**
 * Dynamic Chart Manager for Apex SMS Portal
 * Uses Chart.js for responsive data visualization
 */

let chartInstances = {};

function destroyChart(chartId) {
    if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
        delete chartInstances[chartId];
    }
}

// Student Attendance Donut Chart
function renderStudentAttendanceChart(canvasId, attendanceList) {
    destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const labels = attendanceList.map(item => item.courseCode);
    const percentages = attendanceList.map(item => item.percentage);
    const bgColors = [
        '#2563eb', '#059669', '#d97706', '#8b5cf6', '#ec4899', '#06b6d4'
    ];

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: percentages,
                backgroundColor: bgColors,
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { font: { family: 'Plus Jakarta Sans', size: 12 }, padding: 15 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw}% Attendance`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Student SGPA Performance Line Chart
function renderStudentGPAChart(canvasId, gradesData) {
    destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const labels = gradesData.map(g => g.semester);
    const sgpaValues = gradesData.map(g => g.sgpa);

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'SGPA Trend',
                data: sgpaValues,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#1e3a8a',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 2.5,
                    max: 4.0,
                    ticks: { stepSize: 0.25 }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Admin Department Attendance Bar Chart
function renderAdminAttendanceChart(canvasId) {
    destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CSE', 'ECE', 'ME', 'CE', 'IT', 'EE'],
            datasets: [{
                label: 'Avg Attendance %',
                data: [92, 85, 76, 88, 89, 74],
                backgroundColor: [
                    '#2563eb', '#059669', '#d97706', '#06b6d4', '#8b5cf6', '#e11d48'
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 50, max: 100 }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Admin Fee Collection Doughnut Chart
function renderAdminFeeChart(canvasId) {
    destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Collected (82%)', 'Pending (12%)', 'Overdue (6%)'],
            datasets: [{
                data: [820000, 120000, 60000],
                backgroundColor: ['#059669', '#d97706', '#e11d48'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            cutout: '65%'
        }
    });
}

// Faculty Grade Distribution Chart
function renderFacultyGradeChart(canvasId) {
    destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A+ (90-100)', 'A (80-89)', 'B (70-79)', 'C (60-69)', 'F (<60)'],
            datasets: [{
                label: 'Students Count',
                data: [18, 22, 10, 4, 1],
                backgroundColor: '#1e3a8a',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}
