import { useEffect, useState } from "react";
import { saveToken, saveUserID, getUserID, getBudgetID } from "../store/sessionStorage";
import { v4 as uuidv4 } from 'uuid';
import { createPlan } from "../http-actions/http.js";

const AddMonths = () => {

    const [startMonth, setStartMonth] = useState('');
    const [startName, setStartName] = useState('Start month');
    const [startDropdown, setStartDropdown] = useState(false);
    const [startYear, setStartYear] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endName, setEndName] = useState('End month');
    const [endDropdown, setEndDropdown] = useState(false);
    const [endYear, setEndYear] = useState('');

    const [isLoading, setLoading] = useState(false);

    const [userID, setUserID] = useState('');

    const months = [
        { name: 'January', value: '01' },
        { name: 'February', value: '02' },
        { name: 'March', value: '03' },
        { name: 'April', value: '04' },
        { name: 'May', value: '05' },
        { name: 'June', value: '06' },
        { name: 'July', value: '07' },
        { name: 'August', value: '08' },
        { name: 'September', value: '09' },
        { name: 'October', value: '10' },
        { name: 'November', value: '11' },
        { name: 'December', value: '12' }
    ];

    const changeStartMonth = async (value, name) => {
        setStartName(name);
        setStartMonth(value);
        setStartDropdown(false);
    }

    const changeEndMonth = async (value, name) => {
        setEndName(name);
        setEndMonth(value);
        setEndDropdown(false);
    }

    const toggleStartDropdown = () => {
        setStartDropdown(true);
    }
    const toggleEndDropdown = () => {
        setEndDropdown(true);
    }

    const addMonths = async () => {
        setLoading(true);

        const startDate = `${startYear}-${startMonth}-01`;
        const endDate = `${endYear}-${endMonth}-01`;
        console.log(startDate, endDate);

        const userID = getUserID();
        const budgetID = getBudgetID();


        const res = await createPlan(startDate, endDate, userID, budgetID);
        console.log(res);
        setLoading(false);
    }

    useEffect(() => {
        const userID = getUserID();
        console.log();
    })

    return (
        <>
            <dialog id="add_months_modal" className="modal">
                <div className="modal-box max-w-2xl w-full h-auto p-6"> {/* Ensuring height auto to adjust to content */}
                    <h3 className="font-bold text-lg">Create plan</h3>
                    <div className="flex w-full">
                        <div className="flex space-x-4 w-full py-6">
                            <div className="flex-1">
                                <div className="flex flex-col gap-4">
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn bg-white border border-gray-300 w-full"
                                            onClick={toggleStartDropdown}>
                                            <div className="flex flex-row items-center justify-start w-full">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M6 9l6 6 6-6" />
                                                </svg>
                                                <p className="ml-2">{startName}</p>
                                            </div>
                                        </div>
                                        {startDropdown && (
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow max-h-36">
                                                {months.map((month, index) => (
                                                    <div className="flex flex-grow gap-2" key={index}>
                                                        <button onClick={() => changeStartMonth(month.value, month.name)} className="text-center w-full">{month.name}</button>
                                                    </div>

                                                ))}

                                            </ul>
                                        )}
                                    </div>
                                    <input type="text" placeholder="Start year" className="input input-bordered w-full" value={startYear}
                                        onChange={(e) => setStartYear(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex p-4 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col gap-4">
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn bg-white border border-gray-300 w-full"
                                            onClick={toggleEndDropdown}>
                                            <div className="flex flex-row items-center justify-start w-full">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M6 9l6 6 6-6" />
                                                </svg>
                                                <p className="ml-2">{endName}</p>
                                            </div>
                                        </div>
                                        {endDropdown && (
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow max-h-36">
                                                {months.map((month, index) => (
                                                    <div className="flex flex-grow gap-2" key={index}>
                                                        <button onClick={() => changeEndMonth(month.value, month.name)} className="text-center w-full">{month.name}</button>
                                                    </div>

                                                ))}

                                            </ul>
                                        )}
                                    </div>
                                    <input type="text" placeholder="End year" className="input input-bordered w-full" value={endYear}
                                        onChange={(e) => setEndYear(e.target.value)} />
                                </div></div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-row">
                            <form method="dialog">
                                {isLoading && (
                                    <div className="pr-4"><button className="btn btn-disabled">Close</button></div>)}
                                {!isLoading && (
                                    <div className="pr-4"><button className="btn" onClick={() => window.location.reload()}>Close</button></div>)}
                            </form>
                            <div className=""></div><button className="btn btn-primary" onClick={addMonths}>Add</button></div>
                    </div>
                </div >
            </dialog >
        </>
    )
}

export default AddMonths;