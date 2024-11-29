import { useParams, useNavigate } from 'react-router-dom';

const Navbar = ({ userId, currentPage }) => {

    const navigate = useNavigate();

    let condition = true;

    if (currentPage === "dashboard") {
        condition = false;
    }

    const goBack = async () => {
        let path;
        if (currentPage === "month") {
            path = `/plan/`;
        }
        if (currentPage === "plan") {
            path = `/dashboard/`;
        }
        navigate(path);
    }

    return (
        <>
            <div className="navbar">

                <div className="navbar-start m-0">
                    {condition &&
                        <button className="btn btn-ghost border-gray-300 btn-square btn-sm ml-2" onClick={goBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                    }
                </div>
                <div className="navbar-end m-0">
                </div>
            </div>
        </>

    )
}
export default Navbar;