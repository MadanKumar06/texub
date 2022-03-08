import React, { useEffect, useState} from 'react'
import './styles.scss'
import red from '../../../Assets/sellerdashboard/dashboard/red.png'
import blue from '../../../Assets/sellerdashboard/dashboard/blue.png'
import skyblue from '../../../Assets/sellerdashboard/dashboard/skyblue.png'
import purple from '../../../Assets/sellerdashboard/dashboard/purple.png'
import orange from '../../../Assets/sellerdashboard/dashboard/orange.png'
import green from '../../../Assets/sellerdashboard/dashboard/green.png'
import exchangeoffer from '../../../Assets/sellerdashboard/dashboard/exchangeoffer.png'

import { 
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { height } from '@mui/system'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend);

function Dashboard() {

    const [pievalue, setpievalue] = useState([25, 25, 10, 18, 10, 13])
    const [piebgcolor, setpiebgcolor] = useState([
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

      
      const labels = ['March', 'April', 'May', 'June', 'July', 'August'];

      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [600, 500, 150, 800, 500, 400],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: [1100, 300, 50, 200, 500, 600],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      

    const piedata = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            // label: '# of Votes',
            data: pievalue,
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

    const dashboarddata = [
        { image: red, text: 'New Orders', count: 25 },
        { image: blue, text: 'Completed Orders', count: 320 },
        { image: skyblue, text: 'Payments', count: 55 },
        { image: purple, text: 'My Reviews', count: 220 },
        { image: orange, text: 'Best Sellers', count: 18 },
        { image: green, text: 'Low Inventory Products', count: 55 },
    ]

    const piestyle = {
        borderRadius: '100%',
        padding: '8px',
    }

    const linestyle = {
        backgroundColor: 'white',
        width: '80%',
        textAlign: 'right',
        height: '75% !important',
        marginBottom: '2em'
    }

    const tablebody = [
        { label: 'March', value: 25 },
        { label: 'April', value: 25 },
        { label: 'May', value: 10 },
        { label: 'June', value: 18 },
        { label: 'July', value: 10 },
        { label: 'August', value: 13 },
    ]

  return (
    <div className='dashboard'>
        <div className='dashboard__data'>
            {dashboarddata.map((data, i) => <div className='dasboard__dataiamge' key={i}>
                <img src={data.image} alt="" />
            </div>)}
        </div>
        <div className='dashboard__status'>
            <div className='dashboard__statusoffer'>
                <img src={exchangeoffer} alt="" />
            </div>
            <div className='dashboard__status1'>
                <h2>12th</h2>
                <p>Product Positioning</p>
            </div>
            <div className='dashboard__status1'>
                <h2>98</h2>
                <p>My KPI</p>
            </div>
        </div>
        <div className='dashboard__chart'>
            <div className='chart__pie'>
                <div className='pie__graph'>
                    <div className='graph__header'>
                        {piebgcolor.map((data, i) => 
                            <p style={{ ...piestyle, backgroundColor: `${data}` }}>
                            </p>
                        )}
                    </div>
                    <Pie data={piedata} style={{ height: '100%' }} />
                </div>
                <div className='pie__table'>
                    <p className='table__header'>
                        <span>Months</span>
                        <span>Total Orders</span>
                    </p>
                    {tablebody.map(data => 
                        <p className='table__cell'>
                            <span>{data.label}</span>
                            <span>{data.value}</span>
                        </p>
                    )}
                </div>
            </div>
            <div className='chart__line'>
                <Line options={options} data={data} style={{ ...linestyle }} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard