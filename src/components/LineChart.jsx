import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: ["January", "Febraury", "Febraury", "Febraury", "Febraury", "Febraury", "Febraury"],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
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

const LineChart = () => {
    return (
        <>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart;