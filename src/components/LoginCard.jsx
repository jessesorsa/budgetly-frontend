import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { testApi, login } from "../http-actions/http";
import { saveToken, saveUserID, saveBudgetID } from "../store/sessionStorage";

const LoginCard = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorValue, setErrorValue] = useState(false);

    const Login = async () => {
        const res = await login(email, password);
        console.log(res);

        if (res.token) {
            saveUserID(res.user.id);
            saveBudgetID(res.budgetPlanID);
            saveToken(res.token);
            navigate(`/dashboard`);
        }
        setEmail("");
        setPassword("");

        if (!res.budgetPlanID) {
            setErrorValue(true);
            setTimeout(() => setErrorValue(false), 2000);
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
    }, [])

    return (
        <>
            {errorValue && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-warning">
                        <span>Error with login!</span>
                    </div>
                </div >
            )
            }
            <div className="flex justify-center">
                <div className="card bg-base-100 w-96 shadow-xl p-2">
                    <div className="card-body">
                        <h2 className="flex card-title justify-center text-2xl my-3">Login to Budgetly</h2>
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
                        <button className="btn text-white bg-blue-600 hover:bg-blue-600 my-1" onClick={Login}>Login</button>
                        <div className="card-actions justify-center flex flex-col items-center mt-1 mb-3">
                            <p className="text-sm">Forgot Password?</p>
                            <p className="text-sm text-gray-500">Not a member yet?
                                <Link to={`/signup`} className="link text-blue-600 pl-1">
                                    Signup
                                </Link></p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LoginCard