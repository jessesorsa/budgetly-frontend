import { useEffect, useState } from "react";
import { saveToken, saveUserID, getUserID } from "../store/sessionStorage";
import { v4 as uuidv4 } from 'uuid';
import { createPlan } from "../http-actions/http.js";

const AddMonths = () => {

    const [startMonth, setStartMonth] = useState('');
    const [startDropdown, setStartDropdown] = useState(false);
    const [startYear, setStartYear] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endDropdown, setEndDropdown] = useState(false);
    const [endYear, setEndYear] = useState('');

    const [userID, setUserID] = useState('');

    const monthToNumber = (monthName) => {
        let month = "";
        switch (monthName) {
            case 'January':
                month = "01";
                break;
            case 'February':
                month = "02";
                break;
            case 'March':
                month = "03";
                break;
            case 'April':
                month = "04";
                break;
            case 'May':
                month = "05";
                break;
            case 'June':
                month = "06";
                break;
            case 'July':
                month = "07";
                break;
            case 'August':
                month = "08";
                break;
            case 'September':
                month = "09";
                break;
            case 'October':
                month = "10";
                break;
            case 'November':
                month = "11";
                break;
            case 'December':
                month = "12";
                break;
        }
        return month;

    }

    const addMonths = async () => {
        const sMonth = monthToNumber(startMonth);
        const eMonth = monthToNumber(endMonth);

        const startDate = `${startYear}-${sMonth}-01`;
        const endDate = `${endYear}-${eMonth}-01`;
        console.log(startDate, endDate);

        const userID = getUserID();


        const res = await createPlan(startDate, endDate, userID);
        console.log(res);
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
                                    <input type="text" placeholder="Start month" className="input input-bordered w-full" value={startMonth}
                                        onChange={(e) => setStartMonth(e.target.value)} />
                                    <input type="text" placeholder="Start year" className="input input-bordered w-full" value={startYear}
                                        onChange={(e) => setStartYear(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex p-4 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col gap-4">
                                    <input type="text" placeholder="End month" className="input input-bordered w-full" value={endMonth}
                                        onChange={(e) => setEndMonth(e.target.value)} />
                                    <input type="text" placeholder="End year" className="input input-bordered w-full" value={endYear}
                                        onChange={(e) => setEndYear(e.target.value)} />
                                </div></div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <form method="dialog justify-center items-centered">
                            <div className="flex flex-row">
                                <div className="pr-4"><button className="btn">Cancel</button></div>
                                <div className=""></div><button className="btn btn-primary" onClick={addMonths}>Add</button></div>
                        </form>
                    </div>
                </div >
            </dialog >
        </>
    )
}

export default AddMonths;