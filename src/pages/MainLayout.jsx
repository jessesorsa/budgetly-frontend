import { Link } from 'react-router-dom';
import { clearToken } from '../store/sessionStorage';


const MainLayout = ({ userId, children }) => {

    const logout = async () => {
        clearToken();
    }

    return (
        <>
            <div className="flex flex-row min-h-screen">
                <div className="flex flex-col">
                    <ul className="menu w-40 py-4 px-2">
                        <li><button className="btn btn-ghost btn-square btn-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </button></li>
                        <li><Link to={`/dashboard/`}>Dashboard</Link></li>
                        <li><Link to={`/plan/`}>Plan</Link></li>
                        <li><Link to={`/`} onClick={logout}>Logout </Link></li>
                    </ul></div>
                <div className="flex card p-4 w-full min-h-96">
                    <div className="card bg-base-100 h-full rounded-xl">
                        <div>{children}</div>
                    </div>
                </div>
            </div></>
    );
}

export default MainLayout;