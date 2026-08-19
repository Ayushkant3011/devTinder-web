import React, { useState } from 'react'

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");


    const [error, setError] = useState("");


  return (
    <div className='flex justify-center my-10'>
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
                            type="number"
                            value={age}
                            required
                            placeholder="Enter your Age"
                            onChange={(e) => setAge(e.target.value)}
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
                <button className="btn">Save Profile</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProfile
