import { getMonths, deleteEvent } from "../http-actions/http.js";
import { useState } from 'react';

const SpendingTable = ({ events }) => {

    const [showPopover, setShowPopover] = useState(false);
    const [selectedEventID, setSelectedEventID] = useState("");
    const [deleteRecurrences, setDeleteRecurrences] = useState(false);

    const deleteFunc = async (eventID) => {
        setSelectedEventID(eventID);
        setShowPopover(true);
        console.log("deleting event");
    }

    const confirmDelete = async () => {
        console.log("deleting event");
        await deleteEvent(selectedEventID, deleteRecurrences);
        setShowPopover(false);
        setSelectedEventID(null);
    }

    const cancelDelete = () => {
        setShowPopover(false);
        setSelectedEventID(null);
    }

    const checkIfSelectedEventIsReoccuring = (eventID) => {
        const event = events.spending.find(event => event.id === eventID);
        if(event === undefined){
            return false;
        }else{
            return event.reoccuring;
        }
    }

    return (
        <>
        {showPopover && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Delete Income</h3>
                            <button className="btn btn-sm btn-circle btn-ghost" onClick={cancelDelete}>✕</button>
                        </div>
                        <p>Are you sure you want to delete this entry?</p>
                        {checkIfSelectedEventIsReoccuring(selectedEventID) && (
                            <div className="mt-4">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="checkbox" checked={deleteRecurrences} onChange={(e) => setDeleteRecurrences(e.target.checked)} />
                                <span>This is a recurring event. Do you also want to delete all future recurrences of this event?</span>
                            </label>
                        </div>
                        )}
                        <div className="flex justify-end mt-4">
                            <button className="btn mr-2" onClick={cancelDelete}>Cancel</button>
                            <button className="btn btn-primary" onClick={confirmDelete}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="card card-bordered border-gray-300 mr-4 mt-1 mb-4 w-full min-h-96">
                <div className="overflow-x-auto">
                    <table className="table table-sm bg-gray-50">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-center py-4">NAME</th>
                                <th className="text-center py-4">CATEGORY</th>
                                <th className="text-center py-4">AMOUNT</th>
                                <th className="text-center py-4">RECURRING</th>
                                <th className="text-center py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {events.spending.map((event, index) => (
                                <tr key={index}>
                                    <td className="text-center">{event.name}</td>
                                    <td className="text-center"><div className="badge bg-blue-100 text-blue-800">{event.category}</div></td>
                                    <td className="text-center"><div className="badge bg-red-100 text-red-800">-{event.amount}€</div></td>
                                    <td className="text-center flex justify-center items-center">
                                        {event.reoccuring === true && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        )}
                                    </td>
                                    <td className="text-center w-12">
                                        <div className="dropdown dropdown-hover dropdown-left">
                                            <div tabIndex={0} role="button" className="btn m-1 btn-circle btn-ghost btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="1"></circle>
                                                    <circle cx="19" cy="12" r="1"></circle>
                                                    <circle cx="5" cy="12" r="1"></circle>
                                                </svg>
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                <li><a onClick={() => deleteFunc(event.id)}>Delete</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
};

export default SpendingTable; 