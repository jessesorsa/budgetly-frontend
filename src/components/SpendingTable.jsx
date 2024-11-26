const SpendingTable = ({ events }) => {

    return (
        <>
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
                            <td className="text-center"><div className="badge bg-green-100 text-green-800">{event.amount}</div></td>
                            <td className="text-center flex justify-center items-center">
                                {event.recurring === true && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                )}
                            </td>
                            <td className="text-center w-12">
                                <button className="btn btn-circle btn-ghost btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
};

export default SpendingTable; 