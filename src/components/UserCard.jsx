import React from 'react'

const UserCard = ({ user }) => {
    const {firstName, lastName, photoUrl, age, gender, about} = user;
  return (
    <div className="card bg-base-400 w-96 shadow-sm border-4">
  <figure>
    <img
      src={user.photoUrl}
      alt="User Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +lastName}</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-5">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
