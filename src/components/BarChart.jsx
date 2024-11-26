import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,   // The scale for categorical data (e.g., labels on the x-axis)
    LinearScale,    // The linear scale for numerical data (e.g., values on the y-axis)
    BarElement,     // Element for bar charts
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }],
}

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

const BarChart = () => {
    return (
        <>
            <Bar data={data} options={options} />
        </>
    )
}

export default BarChart;