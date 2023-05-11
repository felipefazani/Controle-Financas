const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
    //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 0,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
      }]
    },
    options: {
      scales: {
        x: {
            beginAtZero: true,
            ticks: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false
            },
            border: {
              display: false
            }
        },
        y: {
          beginAtZero: true,
          ticks: {
            display: false
          },
          grid: {
            display: false,
            drawTicks: false
          },
          border: {
            display: false
          }
        },
        
      },
    },
   
  });
