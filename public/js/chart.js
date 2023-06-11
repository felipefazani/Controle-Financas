const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('chartRelatorio');

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

// new Chart(ctx2, {
//   type: 'bar',
//   data: {
//     labels: ['Receita', 'Despesa'],
//     datasets: [{
//       label: '',
//       data: [12, 19, 3, 5, 2, 3],
//       borderWidth: 0,
//       backgroundColor: [
//         '#1D9000',
//         '#F12020'
//       ],
//     },]
//   },
//   options: {
//     scales: {
//       x: {
//         beginAtZero: true,
//         ticks: {
//           // display: false
//         },
//         grid: {
//           display: false,
//           drawTicks: false
//         },
//         border: {
//           display: false
//         }
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           display: false
//         },
//         grid: {
//           display: false,
//           drawTicks: false
//         },
//         border: {
//           display: false
//         }
//       },
//     },
//     plugins: {
//       legend: {
//         display: false
//       }
//     }
//   }
// })


const data = {
  labels: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01',
  '07/01', '08/01', '09/01', '10/01', '11/01', '12/01', '13/01',
  '14/01', '15/01', '16/01', '17/01', '18/01', '19/01', '20/01',
  '21/01', '22/01', '23/01', '24/01', '25/01', '26/01', '27/01',
  '28/01', '29/01', '30/01',],
  datasets: [{
    label: 'Receita',
    data: [18, 12, 6, 9, 12, 3, 9, 18, 12, 6, 9, 12, 3, 9, 18, 12, 6, 9, 12, 3, 9,
      18, 12, 6, 9, 12, 3, 9, 3, 9, ],
    backgroundColor: 'rgba(54, 162, 235, 1)',
    borderColor: 'rgba(54, 162, 235, 1)',
    order:2,
    datalabels: {
      color: 'white',
      font: {
        weight: 'bold'
      }
    }
  },{
    label: 'Despesa',
    data: [18, 12, 6, 9, 12, 3, 9, 18, 12, 6, 9, 12, 3, 9, 18, 12, 6, 9, 12, 3, 9,
      18, 12, 6, 9, 12, 3, 9, 3, 9, ],
    backgroundColor: 'rgba(255, 26, 104, 1)',
    borderColor: 'rgba(255, 26, 104, 1)',
    order: 2,
    datalabels: {
      color: 'rgba(255, 26, 104, 1)',
      anchor: 'end',
      align: 'end',
      offset: 5,
      font: {
        weight: 'bold'
      }
    }
  }
  // ,{
  //   label: 'Green Line',
  //   data: [18, 12, 6, 9, 12, 3, 9],
  //   backgroundColor: 'rgba(75, 192, 192, 1)',
  //   borderColor: 'rgba(75, 192, 192, 1)',
  //   type: 'line',
  //   order: 1,
  //   datalabels: {
  //    display: false
  // }
  // }
]
};

// config 
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          // display: false
          callback: (value, index, values) => {
            if((index % 2) === 0){
              return data.labels[index]
            }
          }
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
        grace: '5%',
        stacked: true,
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
    plugins: {
      legend: {
        // display: false
      }
    }
  },
  plugins: [ChartDataLabels]
};

// render init block
const chartRelatorios = new Chart(
  document.getElementById('chartRelatorio'),
  config
);


