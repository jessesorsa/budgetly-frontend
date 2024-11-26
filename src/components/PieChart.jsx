import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,   // The scale for categorical data (e.g., labels on the x-axis)
    LinearScale,    // The linear scale for numerical data (e.g., values on the y-axis)
    BarElement,     // Element for bar charts
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
                display: false, // Disable x-axis grid
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false, // Disable y-axis grid
            },
        },
    },
};

const PieChart = () => {
    return (
        <>
            <Pie data={data} options={options} />
        </>
    )
}

export default PieChart;