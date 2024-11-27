import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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

const BarChart = () => {

    const [data, setData] = useState(
        {
            labels: [],
            datasets: [{
                label: 'Income',
                data: [],
                borderColor: '#2563eb',
                backgroundColor: '#2563eb',
            },
            {
                label: 'Spending',
                data: [],
                borderColor: '#2563eb',
                backgroundColor: '#2563eb',
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
                    text: "Spending and Income €", // Label for the y-axis
                },
            },
        },
    };

    useEffect(() => {
        setIsLoading(true);
        const labels = [];
        const spending = [];
        const income = []

        console.log("getting plan dataa");
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
                income.push(month.totalRevenue);
                spending.push(Math.abs(month.totalCosts));
            });
        }

        const realData = {
            labels: labels,
            datasets: [{
                label: 'Income',
                data: income,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
            },
            {
                label: 'Spending',
                data: spending,
                borderColor: '#f87171',
                backgroundColor: '#f87171',
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
                <Bar data={data} options={options} />
            </>
        )
    }
}

export default BarChart;