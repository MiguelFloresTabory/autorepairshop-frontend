import React, { useEffect, useRef } from 'react';
import { Bar, Line, Pie, Chart, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
);



export  function GraficoLineas ({listaDatos, titulo}) {

  const nombres = listaDatos.nombres
  const datos = listaDatos.datos

  var misoptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)'}
        }
    }
  };
  
 
  const midata = {
      labels: listaDatos.nombres,
      datasets: [ // Cada una de las líneas del gráfico
          {
              label: titulo,
              data: listaDatos.datos,
              tension: 0.5,
              fill : true,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              pointRadius: 5,
              pointBorderColor: 'rgba(255, 99, 132)',
              pointBackgroundColor: 'rgba(255, 99, 132)',
          },
      ],
  };
  
  return <Line data={midata} options={misoptions} />
}


export  function GraficoBarras({listaDatos, titulo, max, min}) {

  const nombres = listaDatos.nombres
  const datos = listaDatos.datos

var misoptions = {
  responsive : true,
  animation : false,
  plugins : {
      legend : {
          display : false
      }
  },
  scales : {
      y : {
          min : min,
          max : max
      },
      x: {
          ticks: { color: 'rgba(0, 220, 195)'}
      }
  }
};

var midata = {
  labels: nombres,
  datasets: [
      {

          label: titulo,
          data: datos,
          backgroundColor: 'rgba(0, 220, 195, 0.5)'
      }
  ]
};

  return <Bar data={midata} options={misoptions} />
}






export  function GraficoTortas({listaDatos, titulo}) {
    const nombres = listaDatos.nombres
    const datos = listaDatos.datos

var options = {
    responsive : true,
    maintainAspectRatio: false,
};

var data = {
    labels: nombres,
    datasets: [
        {
            label: titulo,
            data: datos,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


    return <Pie data={data} options={options} />
}

//

export  function GraficoDoughnut({listaDatos, titulo}) {
    const nombres = listaDatos.nombres
    const datos = listaDatos.datos

    const data = {
        labels: listaDatos.nombres,
        datasets: [
          {
            label:titulo,
            data: listaDatos.datos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      var options = {
        responsive : true,
        maintainAspectRatio: false,
    };


    return <Doughnut data={data} options={options} />
}
