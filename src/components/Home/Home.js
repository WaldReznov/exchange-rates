import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['пезда', 59, 80, 81, 56, 55, 0, 109],
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 0, 109],
    }
  ]
};

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Line data={data} options = {{
        legend: {
            display: false
        },
        scales:{
          xAxes: [{
              display: false //this will remove all the x-axis grid lines
          }]
        }
      }}/>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  )
}

export default Home;