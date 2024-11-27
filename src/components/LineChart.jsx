import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { loadToken, getUserID, getBudgetID } from '../store/sessionStorage.js';
import { getMonths, getPlan } from "../http-actions/http.js";
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

const LineChart = () => {

    const [data, setData] = useState(
        {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                fill: false,
                borderColor: '#2563eb',
                tension: 0.1
            }]
        }
    );
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                title: {
                    display: true,
                    text: "Total balance €", // Label for the y-axis
                },
            },
        },
    };

    useEffect(() => {
        setIsLoading(true);
        const labels = [];
        const totalBalance = [];

        console.log("getting plan data");
        const getPlanData = async () => {
            const budgetID = getBudgetID();

            const planData = await getPlan(budgetID);
            if (planData === null) {
                setPlan([]);
            }
            else {
                setPlan(planData);
            }
        }
        getPlanData();

        if (plan !== []) {
            plan.forEach((month) => {
                labels.push(month.monthName);
                totalBalance.push(month.equity)
            });
        }

        const realData = {
            labels: labels,
            datasets: [{
                label: 'Total balance',
                data: totalBalance,
                fill: false,
                pointRadius: 0,
                borderColor: '#2563eb',
                tension: 0.5
            }]
        };
        setData(realData);
        setIsLoading(false);

    }, [plan])

    if (isLoading === true) {
        return (
            <>

            </>
        )
    } else {

        return (
            <>
                <Line data={data} options={options} />
            </>
        )
    }
}

export default LineChart;