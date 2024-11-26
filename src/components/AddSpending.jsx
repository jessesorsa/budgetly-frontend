import { useEffect, useState } from "react";

const AddSpending = () => {

    const [spendingName, setSpendingName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [recurring, setRecurring] = useState(false);

    const addEvent = async () => {
        console.log(spendingName, category, amount, recurring);
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
                        <form method="dialog justify-center items-centered">
                            <div className="flex flex-row">
                                <div className="pr-4"><button className="btn">Cancel</button></div>
                                <div className=""></div><button className="btn btn-primary" onClick={addEvent}>Add</button></div>
                        </form>
                    </div>
                </div >
            </dialog >
        </>
    )
}

export default AddSpending;