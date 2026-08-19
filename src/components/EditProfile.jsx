import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);

    const dispatch = useDispatch();
    const [showToast, setShowtoast] = useState(false);

    const [error, setError] = useState("");

    const saveProfile = async() =>{
        setError("")
        try{
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { 
                    firstName, 
                    lastName, 
                    photoUrl, 
                    age, 
                    gender, 
                    about
                },
                {withCredentials : true}
            );
            
            dispatch(addUser(res?.data?.data));
            setShowtoast(true);

            setTimeout(() =>{
                setShowtoast(false);
            }, 3000);
        }
        catch(err){
            setError(err.response.data)
;        }
    };


  return (
    <>
    <div className='flex justify-center items-stretch gap-8 my-10'>
        <div className='flex justify-center'>
            <div className="card bg-primary text-primary-content w-96 my-4">
                <div className="card-body">
                    <h2 className="card-title">Profile Edit</h2>
                    <div className='my-4'>
                        <p>First Name:</p>
                        <label className="input validator">
                            
                            <input 
                                type="text" 
                                value={firstName}
                                placeholder="Enter your First Name" required 
                                onChange={(e) => setFirstName(e.target.value)}    
                            />
                        </label>
                        <div className='my-7'>
                            <p>Last Name:</p>
                            <label className="input validator">
                            
                            <input
                                type="text"
                                value={lastName}
                                required
                                placeholder="Enter your Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            </label>
                            
                        </div>

                        <div className='my-7'>
                            <p>PhotoUrl:</p>
                            <label className="input validator">
                            
                            <input
                                type="text"
                                value={photoUrl}
                                required
                                placeholder="Enter your Age"
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                            </label>
                            
                        </div>

                        <div className='my-7'>
                            <p>Age:</p>
                            <label className="input validator">
                            
                            <input
                                type="number"
                                value={age}
                                required
                                placeholder="Enter your Age"
                                onChange={(e) => setAge(e.target.value)}
                            />
                            </label>
                            
                        </div>

                        <div className='my-7'>
                            <p>Gender:</p>
                            <label className="input validator">
                            
                            <input
                                type="text"
                                value={gender}
                                required
                                placeholder="Enter your Gender"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            </label>
                            
                        </div>

                        <div className='my-7'>
                            <p>About:</p>
                            <label className="input validator">
                            
                            <input
                                type="text"
                                value={about}
                                required
                                placeholder="Enter About you"
                                onChange={(e) => setAbout(e.target.value)}
                            />
                            </label>
                            
                        </div>
                    </div>
                    <p className='text-red-700'></p>
                    <div className="card-actions justify-end">
                    <button className="btn" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>
            </div>
        </div>

        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about}}/>
    </div>
    <div className="toast toast-top toast-center">
        {showToast && (
            <div className="alert alert-success">
                <span>Profile Saved successfully.</span>
            </div>
        )}
    </div>
    </>
  )
}

export default EditProfile
