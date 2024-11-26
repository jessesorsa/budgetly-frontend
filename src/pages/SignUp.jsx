import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SignUpCard from "../components/SignUpCard.jsx";

const SignUp = () => {
    return (
        <>
            <Header />
            <div className="py-28 px-40">
                <SignUpCard />
            </div>
            <Footer />
        </>
    )
};

export default SignUp;