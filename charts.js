function createTrendChart(ctx, data) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Who is Hiring?',
                    data: data.hiring,
                    borderColor: '#9b59b6',
                    backgroundColor: '#9b59b6',
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#9b59b6',
                    fill: false
                },
                {
                    label: 'Who Wants to be Hired?',
                    data: data.wanted,
                    borderColor: '#2ecc71',
                    backgroundColor: '#2ecc71',
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#2ecc71',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Posts'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    },
                    ticks: {
                        maxRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: 12
                    }
                }
            }
        }
    });
}

function createCategoryChart(ctx, data, categoryData) {
    // Generate colors for each keyword
    const colors = [
        '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6',
        '#1abc9c', '#e67e22', '#34495e', '#16a085', '#c0392b'
    ];

    // Create a dataset for each keyword
    const datasets = categoryData.labels.map((keyword, index) => ({
        label: keyword,
        data: categoryData.trends[keyword],
        borderColor: colors[index],
        backgroundColor: colors[index],
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: colors[index],
        fill: false
    }));

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Mentions (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    },
                    ticks: {
                        maxRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: 12
                    }
                }
            }
        }
    });
}

// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const trendCtx = document.getElementById('jobTrends');
    const progLangCtx = document.getElementById('programmingLanguages');
    const dbCtx = document.getElementById('databases');

    createTrendChart(trendCtx, chartData);
    createCategoryChart(progLangCtx, chartData, chartData.categories.programming_language);
    createCategoryChart(dbCtx, chartData, chartData.categories.database);
});
