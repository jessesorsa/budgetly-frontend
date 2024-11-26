import { createEvent } from "../http-actions/http.js";
import { useEffect, useState } from "react";
import { getBudgetID, getUserID } from "../store/sessionStorage.js";
import { useParams, useNavigate } from 'react-router-dom';

const AddSpending = ({ monthID }) => {

    const [spendingName, setSpendingName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [recurring, setRecurring] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const addEvent = async () => {
        setLoading(true);
        const budgetID = getBudgetID();
        const userID = getUserID();

        console.log(spendingName, category, amount, recurring);
        const amount_number = -(Math.abs(parseFloat(amount)));
        await createEvent(spendingName, category, amount_number, recurring, userID, monthID, budgetID);
        setAmount('');
        setSpendingName('');
        setCategory('');
        setLoading(false);

        // The page is naively reloaded. I didn't have time to implement proper state management
    }

    return (
        <>
            <dialog id="add_spending_modal" className="modal">
                <div className="modal-box w-96">
                    <h3 className="font-bold text-lg">Add spending event</h3>
                    <div className="flex flex-col gap-6 w-full py-6">
                        <input type="text" placeholder="Name" className="input input-bordered w-full" value={spendingName}
                            onChange={(e) => setSpendingName(e.target.value)} />
                        <input type="text" placeholder="Category" className="input input-bordered w-full" value={category}
                            onChange={(e) => setCategory(e.target.value)} />
                        <input type="text" placeholder="Amount" className="input input-bordered w-full" value={amount}
                            onChange={(e) => setAmount(e.target.value)} />
                        <div className="flex flex-row gap-6">
                            <input type="checkbox" className="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
                            <p className="">Recurring</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-row justify-center items-centered">
                            <form method="dialog">
                                {isLoading && (
                                    <div className="pr-4"><button className="btn btn-disabled">Close</button></div>)}
                                {!isLoading && (
                                    <div className="pr-4"><button className="btn" onClick={() => window.location.reload()}>Close</button></div>)}
                            </form>
                            <div className=""></div><button className="btn btn-primary" onClick={addEvent}>Add</button></div>
                    </div>
                </div >
            </dialog >
        </>
    )
}

export default AddSpending;