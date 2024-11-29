import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadToken, getUserID, getBudgetID } from '../store/sessionStorage.js';
import { getMonths, getPlan } from "../http-actions/http.js";
import { PlanContext, PlanProvider } from "../store/PlanContext.js";

import MainLayout from "./MainLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import BarChart from "../components/BarChart.jsx";
import LineChart from "../components/LineChart.jsx";
import PieChart from "../components/PieChart.jsx";
import Plan from "./Plan.jsx";

const Dashboard = () => {

   // const [plan, setPlan] = useState([]);
    const {plan, setPlan, updateMonthInPlan} = React.useContext(PlanContext);
    const [loading, setLoading] = useState(true);
    const [startBalance, setStartBalance] = useState(0);
    const [endBalance, setEndBalance] = useState(0);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [bar, setBar] = useState(false);
    const [line, setLine] = useState(true);
    const currentPage = "dashboard";

    const userID = getUserID();

    const navigate = useNavigate();

    const goToPlan = async () => {
        navigate(`/plan`)
    }

    const toggle = () => {
        setLine(!line)
        setBar(!bar)
    }

    useEffect(() => {
        const jwt = loadToken();
        if (jwt === "") {
            navigate("/");
        } else {
            setIsAuthenticated(true);
        };

        const getPlanData = async () => {
            const budgetID = getBudgetID();

            const planData = await getPlan(budgetID);
            if (planData === null) {
                setPlan([]);
            }
            else {
                setPlan(planData);
            }
            setLoading(false);
        }
        getPlanData();

    }, [navigate]);

    useEffect(() => {
        if (plan !== []) {
            let calculatedBalance = 0;
            plan.forEach((month, index) => {
                if (index === 0) {
                    setStartBalance(month.sum)
                }
                calculatedBalance += parseFloat(month.sum);
            });
            setEndBalance(calculatedBalance);
        }
    }, [plan])

    if (isAuthenticated) {
        return (
            <>
                <PlanProvider>
                    <MainLayout userId={userID}>
                        <Navbar userID={userID} currentPage={currentPage} />
                        <div className="flex flex-row w-full px-4 py-1 gap-4">
                            <div className="card card-bordered border-gray-300 min-w-60">
                                <div className="card py-4 px-6">
                                    <h2 className="card-title text-xl">Start balance</h2>
                                    <p className="text-gray-500">Total</p>
                                    <div className="card-actions justify-start mt-4">
                                        <h2 className="card-title text-4xl font-bold">{startBalance}€</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-bordered border-gray-300 min-w-60">
                                <div className="card py-4 px-6">
                                    <h2 className="card-title text-xl">End balance</h2>
                                    <p className="text-gray-500">Total</p>
                                    <div className="card-actions justify-start mt-4">
                                        <h2 className="card-title text-4xl font-bold">{endBalance}€</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-full px-4 py-1 justify-between">
                            <button className="btn rounded-3xl text-white bg-blue-600 hover:bg-blue-600 my-1" onClick={goToPlan}>
                                <p>Go to plan</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
                            </button>
                            <div className="flex items-end justify-end">
                                <div className="card my-1 mr-2 flex items-center">
                                    <div className="flex gap-4">
                                        <p className="text-md text-gray-500">Income and spending</p>
                                        <input
                                            type="checkbox"
                                            className="toggle border-gray-300 bg-black [--tglbg:white] hover:bg-black"
                                            defaultChecked
                                            onClick={toggle}
                                        />
                                        <p className="text-md text-gray-500">Total balance</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-wrap w-full min-h-60 px-4 pb-4 pt-1 items-center">
                            {bar && (
                                <div className="card card-bordered border-gray-300 max-h-96 w-full p-6">
                                    <BarChart className="w-full h-full" />
                                </div>)}
                            {line && (
                                <div className="card card-bordered border-gray-300 max-h-96 w-full p-6">
                                    <LineChart className="w-full h-full" />
                                </div>
                            )}
                        </div>
                    </MainLayout>
                </PlanProvider>
            </>
        )
    }

};

export default Dashboard;

/*
<div className="card card-bordered border-gray-300 flex-grow min-h-72 max-w-72 p-6 flex items-center justify-center">
                            <PieChart className="w-full h-full" />
                        </div>
                        <div className="card card-bordered border-gray-300 flex-grow min-h-72 max-w-4xl p-6 flex items-center justify-center">
                            <LineChart className="w-full h-full" />
                        </div>
                         */