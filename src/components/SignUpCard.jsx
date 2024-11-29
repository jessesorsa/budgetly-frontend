import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { testApi, login, signUp } from "../http-actions/http";
import SignUp from "../pages/SignUp";

const LoginCard = () => {

    const userId = 1234;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorValue, setErrorValue] = useState(false);
    const [successValue, setSuccessValue] = useState(false);

    const navigate = useNavigate();

    const SignUp = async () => {
        console.log(email, password);
        const res = await signUp(firstName, lastName, email, password);
        console.log(res);
        if (res.budgetPlanID) {
            navigate(`/`);
        }

        setEmail("");
        setPassword("");
        if (!res.budgetPlanID) {
            setErrorValue(true);
            setTimeout(() => setErrorValue(false), 2000);
        }else{
            setSuccessValue(true);
            setTimeout(() => setSuccessValue(false), 4000);
            navigate('/dashboard');
        }
    }

    useEffect(() => {
        /*const test = async () => {
            console.log("fetch");
            const res = await testApi();
            setValue = res;
        }
        test();
         */
        console.log("hello");

    }, [])

    return (
        <>
            {errorValue && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-warning">
                        <span>Error with sign up!</span>
                    </div>
                </div >
            )
            }
            {successValue && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>User created successfully!</span>
                    </div>
                </div>
            )}
            <div className="flex justify-center">
                <div className="card bg-base-100 w-96 shadow-xl p-2">
                    <div className="card-body">
                        <h2 className="flex card-title justify-center text-2xl my-3">Sign up to Budgetly!</h2>
                        <label className="input input-bordered flex items-center my-1">
                            <input
                                type="text"
                                className="grow"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center my-1">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center my-1">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center my-1">
                            <form>
                                <input
                                    type="password"
                                    className="grow"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </form>
                        </label>

                        <button className="btn text-white bg-blue-600 hover:bg-blue-600 my-1" onClick={SignUp}>Sign up</button>
                        <div className="card-actions justify-center flex flex-col items-center mt-1 mb-3">
                            <Link to={`/`} className="link text-blue-600 text-sm">
                                Back to login
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LoginCard