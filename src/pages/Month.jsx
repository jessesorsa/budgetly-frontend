import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getMonth } from "../http-actions/http.js";

import MainLayout from "./MainLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import AddIncome from "../components/AddIncome.jsx";
import AddSpending from "../components/AddSpending.jsx";
import IncomeTable from "../components/SpendingTable.jsx";
import SpendingTable from "../components/SpendingTable.jsx";

const Month = ({ monthId }) => {

    const navigate = useNavigate();

    const currentPage = "month"
    const [month, setMonth] = useState();
    const [loading, setLoading] = useState(true);

    const { userId } = useParams();

    useEffect(() => {
        const getMonthData = async () => {
            const monthData = await getMonth(monthId);
            const dummyData = {
                income: [
                    {
                        name: "Salary",
                        category: "Job",
                        amount: "1500€",
                        recurring: true
                    },
                    {
                        name: "Freelance Project",
                        category: "Freelance",
                        amount: "500€",
                        recurring: false
                    }
                ],
                spending: [
                    {
                        name: "Rent",
                        category: "Housing",
                        amount: "600€",
                        recurring: true
                    },
                    {
                        name: "Groceries",
                        category: "Food",
                        amount: "200€",
                        recurring: false
                    }
                ],
                stats: {
                    Income: "2000€",
                    Spending: "5000€",
                    Revenue: "-2500€"
                }
            };

            setMonth(dummyData);
            setLoading(false);
        }
        getMonthData();
    }, [])

    if (loading) {
        // While the data is loading, you can show a loading spinner or message
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
                            <h2 className="card-title text-xl">Income</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">{month.stats.Income}</h2>
                            </div>
                        </div>
                        <div className="stat">
                            <h2 className="card-title text-xl">Spending</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">{month.stats.Spending}</h2>
                            </div>
                        </div>
                        <div className="stat">
                            <h2 className="card-title text-xl">Revenue</h2>
                            <p className="text-gray-500">Total</p>
                            <div className="card-actions justify-start mt-4">
                                <h2 className="card-title text-4xl font-bold">{month.stats.Revenue}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-full h-16 py-1 px-4 items-center">
                    <div className="flex flex-row w-full px-2 items-center">
                        <h2 className="text-xl font-bold">Income</h2>
                        <button className="btn btn-square btn-sm shadow-sm border-gray-300 bg-white hover:bg-white ml-4"
                            onClick={() => document.getElementById('add_income_modal').showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <AddIncome />
                    </div>
                    <div className="flex w-full px-2 items-center">
                        <h2 className="text-xl font-bold">Spending</h2>
                        <button className="btn btn-square btn-sm shadow-sm border-gray-300 bg-white hover:bg-white ml-4"
                            onClick={() => document.getElementById('add_spending_modal').showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <AddSpending />
                    </div>
                </div>

                <div className="flex flex-row w-full gap-4">
                    <div className="flex card card-bordered border-gray-300 ml-4 mt-1 mb-4 w-full min-h-96">
                        <div className="overflow-x-auto">
                            <IncomeTable events={month} />
                        </div>
                        {/*<p>UserID: {userId}</p>*/}
                    </div>
                    <div className="card card-bordered border-gray-300 mr-4 mt-1 mb-4 w-full min-h-96">
                        <div className="overflow-x-auto">
                            <SpendingTable events={month} />
                        </div>
                        {/*<p>UserID: {userId}</p>*/}
                    </div>
                </div>
            </MainLayout >
        </>
    )
};

export default Month;