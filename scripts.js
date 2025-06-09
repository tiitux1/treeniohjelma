document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            let target = button.getAttribute('data-target');

            // Fix for Tiistai button to point to training-tuesday section
            if (target === 'tuesday') {
                target = 'training-tuesday';
            }
            if (target === 'monday') {
                target = 'training-monday';
            }

            const targetElement = document.getElementById(target);
            targetElement.classList.add('active');

            // Scroll to the target section smoothly
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Weigh-ins form and chart logic
    const weightForm = document.getElementById('weight-form');
    const weightInput = document.getElementById('weight');
    const ctx = document.getElementById('weightChart').getContext('2d');

    // Load saved weigh-ins from localStorage or initialize empty array
    let weighIns = JSON.parse(localStorage.getItem('weighIns')) || [];

    // Function to update chart
    function updateChart() {
        const labels = weighIns.map((_, index) => `Entry ${index + 1}`);
        const weights = weighIns;

        if (window.weightChartInstance) {
            window.weightChartInstance.data.labels = labels;
            window.weightChartInstance.data.datasets[0].data = weights;
            window.weightChartInstance.update();
        } else {
            window.weightChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Weight (kg)',
                        data: weights,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Entry'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Weight (kg)'
                            },
                            beginAtZero: false
                        }
                    }
                }
            });
        }
    }

    // Initial chart render
    updateChart();

    // Handle form submission
    weightForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const weight = parseFloat(weightInput.value);

        if (isNaN(weight) || weight <= 0) {
            alert('Please enter a valid weight');
            return;
        }

        // Save weigh-in
        weighIns.push(weight);
        localStorage.setItem('weighIns', JSON.stringify(weighIns));

        // Update chart
        updateChart();

        // Clear input
        weightInput.value = '';
    });
});
