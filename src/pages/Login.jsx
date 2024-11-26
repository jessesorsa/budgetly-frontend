import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import LoginCard from "../components/LoginCard.jsx";


const Login = () => {
    return (
        <>
            <Header />
            <div className="py-28 px-40">
                <LoginCard />
            </div>
            <Footer />
        </>
    )
};

export default Login;