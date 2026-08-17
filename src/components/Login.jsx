import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [emailId, setEmailId] = useState("virat@gmail.com");
    const [password, setPassword] = useState("Virat@123");
    const dispatch = useDispatch();


    const handleLogin = async () =>{
        try{
            const response = await axios.post(
                "http://localhost:3011/login", {
                emailId,
                password,
                },
                {withCredentials: true}
            );
            dispatch(addUser(response.data));
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='flex justify-center my-10'>
        <div className="card bg-primary text-primary-content w-96 my-4">
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <div className='my-4'>
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                            >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input 
                            type="email" 
                            value= {emailId} 
                            placeholder="Enter your Email-ID" required 
                            onChange={(e) => setEmailId(e.target.value)}    
                        />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>

                    <div className='my-7'>
                        <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                            >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            value={password}
                            required
                            placeholder="Password"
                            minLength="8"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </label>
                        <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                    </div>
                </div>
                <div className="card-actions justify-end">
                <button className="btn" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
