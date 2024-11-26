import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import { loadToken, getUserID } from '../store/sessionStorage.js';

import MainLayout from "./MainLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import BarChart from "../components/BarChart.jsx";
import LineChart from "../components/LineChart.jsx";
import PieChart from "../components/PieChart.jsx";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const currentPage = "dashboard";

    const userID = getUserID();

    const navigate = useNavigate();

    const goToPlan = async () => {
        navigate(`/plan`)
    }

    useEffect(() => {
        const jwt = loadToken();
        if (jwt === "") {
            navigate("/")
        } else {
            setIsAuthenticated(true);
        };
    }, []);

    if (isAuthenticated) {
        return (
            <>
                <MainLayout userId={userID}>
                    <Navbar userID={userID} currentPage={currentPage} />
                    <div className="flex flex-row w-full px-4 py-1 gap-4">
                        <div className="card card-bordered border-gray-300 min-w-60">
                            <div className="card py-4 px-6">
                                <h2 className="card-title text-xl">Current balance</h2>
                                <p className="text-gray-500">Total</p>
                                <div className="card-actions justify-start mt-4">
                                    <h2 className="card-title text-4xl font-bold">0€</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card card-bordered border-gray-300 min-w-60">
                            <div className="card py-4 px-6">
                                <h2 className="card-title text-xl">Predicted balance</h2>
                                <p className="text-gray-500">Total</p>
                                <div className="card-actions justify-start mt-4">
                                    <h2 className="card-title text-4xl font-bold">0€</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full px-4 py-1 items-center">
                        <button className="btn rounded-3xl text-white bg-blue-600 hover:bg-blue-600 my-1" onClick={goToPlan}>
                            <p>Go to plan</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                    <div className="flex flex-wrap w-full px-4 pt-1 gap-4 items-center mb-4">
                        <div className="card card-bordered border-gray-300 flex-grow min-h-72 max-w-sm p-6 flex items-center justify-center">
                            <BarChart className="w-full h-full" />
                        </div>
                        <div className="card card-bordered border-gray-300 flex-grow min-h-72 min-w-4xl max-w-4xl p-6 flex items-center justify-center">
                            <LineChart className="w-full h-full" />
                        </div>
                        <div className="card card-bordered border-gray-300 flex-grow min-h-72 max-w-72 p-6 flex items-center justify-center">
                            <PieChart className="w-full h-full" />
                        </div>
                        <div className="card card-bordered border-gray-300 flex-grow min-h-72 max-w-4xl p-6 flex items-center justify-center">
                            <LineChart className="w-full h-full" />
                        </div>
                    </div>
                </MainLayout>
            </>
        )
    }

};

export default Dashboard;