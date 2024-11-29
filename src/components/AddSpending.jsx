import { createEvent, fetchCategories } from "../http-actions/http.js";
import { useEffect, useState } from "react";
import { getBudgetID, getUserID } from "../store/sessionStorage.js";
import { useParams, useNavigate } from 'react-router-dom';

const AddSpending = ({ monthID, month, updateMonth }) => {

    const [spendingName, setSpendingName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [recurring, setRecurring] = useState(false);
    const [numReoccurrences, setNumReoccurrences] = useState('');
    const [isLoadingCategroies, setLoadingCategories] = useState(false);
    const [backendCategories, setBackendCategories] = useState([]);


    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        const loadCategories = async () => {
            setLoadingCategories(true);
            const fetchedCategories = await fetchCategories();
            setBackendCategories(fetchedCategories);
            setLoadingCategories(false);
        };
        loadCategories();
    }, []);

    const addEvent = async () => {
        setLoading(true);
        const budgetID = getBudgetID();
        const userID = getUserID();
        //const categoryID = backendCategories.find(cat => cat.name === category).id;
        const amount_number = -(Math.abs(parseFloat(amount)));
        const numReoccurrencesInt = parseInt(numReoccurrences);
        const SelectedCategory = backendCategories.find(cat => cat.name === category);
        const categoryID = SelectedCategory.id;
        await createEvent(spendingName, categoryID, amount_number, recurring, userID, monthID, budgetID, numReoccurrencesInt);
        setAmount('');
        setSpendingName('');
        setCategory('');
        const newIncome = {
            "Name": spendingName,
            "Total": amount_number,
            "Reoccuring": recurring,
            "Category": SelectedCategory.name,
        }
        handleAddSpend(newIncome);
        setLoading(false);
        window.location.reload();

        // The page is naively reloaded. I didn't have time to implement proper state management
    }

    const handleAddSpend = (newIncome) => {
        const updatedIncome = [...month.income, newIncome];
        updateMonth({ ...month, income: updatedIncome }, true, newIncome.Total);
    };

    return (
        <>
            <dialog id="add_spending_modal" className="modal">
                <div className="modal-box w-96">
                    <h3 className="font-bold text-lg">Add spending event</h3>
                    <div className="flex flex-col gap-6 w-full py-6">
                        <input type="text" placeholder="Name" className="input input-bordered w-full" value={spendingName}
                            onChange={(e) => setSpendingName(e.target.value)} />
                        <select className="select select-bordered w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {isLoadingCategroies ? (
                                <option>Loading categories...</option>
                            ) : (
                                backendCategories.map((cat, index) => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))
                            )}
                        </select>
                        <div className="flex flex-row items-center justify-between">
                            <input type="text" placeholder="Amount" className="input input-bordered w-full" value={amount}
                                onChange={(e) => setAmount(e.target.value)} />
                            <p className="text text-lg mx-6">€</p>
                        </div>
                        {<div className="flex flex-row gap-6">
                            <input type="checkbox" className="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
                            <p className="">Recurring</p>
                        </div>}
                        {recurring && (
                            <input type="number" placeholder="Number of Reoccurrences" className="input input-bordered w-full" value={numReoccurrences}
                                onChange={(e) => setNumReoccurrences(e.target.value)} />
                        )} 
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