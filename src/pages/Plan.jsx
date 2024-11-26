import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getPlan } from "../http-actions/http.js";

import MainLayout from "./MainLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import AddMonths from "../components/AddMonths.jsx";

const Plan = () => {

    const currentPage = "plan";

    const navigate = useNavigate();

    const { userId } = useParams();
    const monthId = 1;

    const [plan, setPlan] = useState();
    const [loading, setLoading] = useState(true);

    const goToMonth = async () => {
        navigate(`/month/${monthId}`)
    }

    useEffect(() => {
        const getPlanData = async () => {
            const planData = await getPlan();
            const dummyData = {
                months: [
                    {
                        "name": "January",
                        "income": "+500€",
                        "spending": "-300€",
                        "sum": "+200€",
                        "total": "1500€",
                        "assets": "1200€"
                    },
                    {
                        "name": "February",
                        "income": "+700€",
                        "spending": "-400€",
                        "sum": "+300€",
                        "total": "1800€",
                        "assets": "1500€"
                    },
                    {
                        "name": "March",
                        "income": "+600€",
                        "spending": "-350€",
                        "sum": "+250€",
                        "total": "2000€",
                        "assets": "1700€"
                    }
                ],
                stats: {
                    currentBalance: "2000€",
                    predictedBalance: "5000€",
                    assets: "-2500€"
                }
            }

            setPlan(dummyData);
            setLoading(false);
        }
        getPlanData();
    }, [])

    if (loading) {
        return (
            <MainLayout userId={userId}>
                <Navbar userId={userId} currentPage={currentPage} />
                <div className="flex flex-row w-full h-full justify-center items-center px-4 py-1">
                    <div className="flex justify-center items-center h-full">
                        <p>Loading...</p>
                    </div>
                </div>
            </MainLayout >
        );
    }

    return (
        <>
            <MainLayout userId={userId}>
                <Navbar userId={userId} currentPage={currentPage} />
                <div className="flex flex-row w-full px-4 py-1">
                    <div className="stats stats-vertical lg:stats-horizontal card card-bordered border-gray-300">
                        <div className="stat">
                            <h2 className="card-title text-xl">Current balance</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">{plan.stats.currentBalance}</h2>
                            </div>
                        </div>
                        <div className="stat">
                            <h2 className="card-title text-xl">Predicted balance</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">{plan.stats.predictedBalance}</h2>
                            </div>
                        </div>
                        <div className="stat">
                            <h2 className="card-title text-xl">Assets</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">{plan.stats.assets}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-full h-16 py-1 items-center justify-between">
                    <div className="flex justify-start px-6"><h2 className="text-xl font-bold">Plan view</h2></div>
                    <div className="flex justify-end px-4">
                        <button className="btn rounded-3xl btn-md shadow-sm border-gray-300 text-black bg-white hover:bg-white my-1"
                            onClick={() => document.getElementById('add_months_modal').showModal()}>
                            <p className="text-sm">Create plan</p>
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
                                {plan.months.map((month, index) => (
                                    <tr className="hover:bg-gray-50" key={index} onClick={goToMonth}>
                                        <td className="text-center">{month.name}</td>
                                        <td className="text-center"><div className="badge bg-green-100 text-green-800">{month.income}</div></td>
                                        <td className="text-center"><div className="badge bg-red-100 text-red-800">{month.spending}</div></td>
                                        <td className="text-center"><div className="badge bg-green-100 text-green-800">{month.sum}</div></td>
                                        <td className="text-center">{month.total}</td>
                                        <td className="text-center">{month.assets}</td>
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