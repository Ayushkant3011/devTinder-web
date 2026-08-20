import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async () =>{
        try{
            const response = await axios.post(
                BASE_URL + "/login", {
                emailId,
                password,
                },
                {withCredentials: true}
            );
            dispatch(addUser(response.data));
            navigate("/")
        }catch(err){
            setError(err?.response?.data || "Something Went Wrong");
            console.log(err);
        }
    }

    const handleSignUp = async() =>{
        try{
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true },
            );
            dispatch(addUser(res.data.data));
            navigate("/profile");
        }
        catch(err){
            setError(err?.response?.data || "Something Went Wrong");
            console.log(err);
        }
    }

  return (
    <div className="flex justify-center my-10">
    <div className="card bg-primary text-primary-content w-96 shadow-xl">
        <div className="card-body p-8">

            <h2 className="card-title text-2xl mb-4">
                {isLoginForm ? "Login" : "Sign Up"}
            </h2>

            <div className="my-2">

                {/* First Name + Last Name */}
                {!isLoginForm && <div className="flex justify-between gap-4 mb-4">

                    <label className="input validator flex-1">
                        <input
                            type="email"
                            value={firstName}
                            placeholder="First Name"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>

                    <label className="input validator flex-1">
                        <input
                            type="email"
                            value={lastName}
                            placeholder="Last Name"
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>

                </div>}

                {/* Email */}
                <label className="input validator w-full mb-4">
                    <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect
                                width="20"
                                height="16"
                                x="2"
                                y="4"
                                rx="2"
                            ></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>

                    <input
                        type="email"
                        value={emailId}
                        placeholder="Enter your Email-ID"
                        required
                        onChange={(e) => setEmailId(e.target.value)}
                    />
                </label>

                <div className="validator-hint hidden">
                    Enter valid email address
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="input validator w-full">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>

                                <circle
                                    cx="16.5"
                                    cy="7.5"
                                    r=".5"
                                    fill="currentColor"
                                ></circle>
                            </g>
                        </svg>

                        <input
                            type="password"
                            value={password}
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>

            </div>

            <p className="text-red-700 text-sm mb-2">
                {error}
            </p>

            <div className="card-actions justify-end mt-2">
                <button
                    className="btn px-8"
                    onClick={isLoginForm ? handleLogin : handleSignUp}
                >
                    {isLoginForm ? "Login" : "Sign Up"}
                </button>
            </div>  

            <p className="text-red-700 text-sm mb-2 cursor-pointer font-bold py-2"
                onClick={() => setIsLoginForm((value) => !value)}
            >
                {isLoginForm 
                    ? "New User? Sign Up Here"
                    : "Existing User? Login Here"
                }
            </p>

        </div>
    </div>
    </div>
  )
}

export default Login
