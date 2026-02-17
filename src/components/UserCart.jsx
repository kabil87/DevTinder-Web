import React from 'react'

const UserCart = ({user}) => {

    const {firstName,lastName,age,gender,photoUrl,description,skills} = user;

  return (
    <div className='flex justify-center'>

        <div className="card bg-base-300 w-80 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    {age && gender &&<p>{age+" "+gender}</p>}
    <p>{description}</p>
    <div className="card-actions justify-center gap-10">
    <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
      
    </div>
  )
}

export default UserCart
