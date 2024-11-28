import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getMonths, getPlan } from "../http-actions/http.js";

import MainLayout from "./MainLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import AddMonths from "../components/AddMonths.jsx";
import { getBudgetID, getUserID } from "../store/sessionStorage.js";

const Plan = () => {

    const currentPage = "plan";

    const navigate = useNavigate();
    const userID = getUserID();

    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(true);

    const goToMonth = async (month) => {
        console.log(month);
        navigate(`/month/${month.monthlyPlanID}`, { state: { monthStats: month } });
    }

    useEffect(() => {
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
    }, [])

    if (loading) {
        return (
            <MainLayout userId={userID}>
                <Navbar userId={userID} currentPage={currentPage} />
                <div className="flex flex-row w-full h-full justify-center items-center px-4 py-1">
                    <div className="flex justify-center items-center h-full">
                        <p>Loading...</p>
                    </div>
                </div>
            </MainLayout >
        );
    }

    //{plan.stats.currentBalance}
    //{plan.stats.predictedBalance}
    //{plan.stats.assets}


    return (
        <>
            <MainLayout userId={userID}>
                <Navbar userId={userID} currentPage={currentPage} />
                <div className="flex flex-row w-full px-4 py-1">
                    <div className="stats stats-vertical lg:stats-horizontal card card-bordered border-gray-300">
                        <div className="stat">
                            <h2 className="card-title text-xl">Start balance</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">0€</h2>
                            </div>
                        </div>
                        <div className="stat">
                            <h2 className="card-title text-xl">Predicted balance</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">0€</h2>
                            </div>
                        </div>
                        <div className="stat">
                            <h2 className="card-title text-xl">Assets</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">0€</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-full h-16 py-1 items-center justify-between">
                    <div className="flex justify-start px-6"><h2 className="text-xl font-bold">Plan view</h2></div>
                    <div className="flex justify-end px-4">
                        <button className="btn rounded-3xl btn-md shadow-sm border-gray-300 text-black bg-white hover:bg-white my-1"
                            onClick={() => document.getElementById('add_months_modal').showModal()}>
                            <p className="text-sm">Create new plan</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button></div>
                    <AddMonths />
                </div>

                <div className="card card-bordered border-gray-300 mx-4 mt-1 mb-4 min-w-60 min-h-96">
                    <div className="overflow-x-auto">
                        <table className="table table-sm bg-gray-50">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-center py-4">MONTH</th>
                                    <th className="text-center py-4">INCOME</th>
                                    <th className="text-center py-4">SPENDING</th>
                                    <th className="text-center py-4">SUM</th>
                                    <th className="text-center py-4">TOTAL</th>
                                    <th className="text-center py-4">ASSETS</th>
                                    <th className="text-center py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">

                                {plan.map((month, index) => (
                                    <tr className="hover:bg-gray-50" key={index} onClick={() => goToMonth(month)}>
                                        <td className="text-center">{month.monthName}</td>
                                        <td className="text-center"><div className="badge bg-green-100 text-green-800">{month.totalRevenue}€</div></td>
                                        <td className="text-center"><div className="badge bg-red-100 text-red-800">{month.totalCosts}€</div></td>
                                        <td className="text-center"><div className="badge">{month.sum}€</div></td>
                                        <td className="text-center">{month.equity}€</td>
                                        <td className="text-center">{month.assets}€</td>
                                        <td className="text-center w-12">
                                            <button className="btn btn-square btn-ghost btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="1"></circle>
                                                    <circle cx="19" cy="12" r="1"></circle>
                                                    <circle cx="5" cy="12" r="1"></circle>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr >
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/*<p>UserID: {userId}</p>*/}
                </div>
            </MainLayout >
        </>
    )
};

export default Plan;