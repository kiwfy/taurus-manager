Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const context = document.getElementById('queueStatusPieChart');

function loadQueueStatusPieChart(data) {
  new Chart(context, {
    type: 'doughnut',
    data: {
      labels: ['Failed', 'Waiting', 'Active', 'Delayed', 'Paused', 'Completed'],
      datasets: [{
        data,
        backgroundColor: ['#003f5c', '#444e86', '#36b9cc', '#dd5182', '#ff6e54', '#ffa600'],
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}
