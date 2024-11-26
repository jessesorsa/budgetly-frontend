import { Link } from "react-router-dom";

const Test = () => {
    return (
        <>
            <p>Test page</p>
            <Link to="/" className="link">
                Go to main
            </Link>
        </>
    )
};

export default Test;