import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import Login from './Login';
import { removeFeed } from '../utils/feedSlice';

const UserCart = ({user}) => {

    const {_id,firstName,lastName,age,gender,photoUrl,description,skills} = user;
    const dispatch = useDispatch();

    const handleFeed = async (status,_id)=>{

      try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true});
        console.log("calling");
        
        dispatch(removeFeed(_id));
      }
      catch(err){}
    }

  return (
    <div className='flex justify-center mt-4 z-30 h-103'>

        <div className="card bg-base-300 w-80 shadow-sm">
  <figure>
    <img
    className='mt-10'
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    {age && gender &&<p>{age+" "+gender}</p>}
    <p>{description}</p>
    <div className="card-actions justify-center gap-10">

    <button onClick={()=>handleFeed("ignored",_id)} className="btn btn-primary">Ignore</button>
      <button onClick={()=>handleFeed("interested",_id)} className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>


      
    </div>
  )
}

export default UserCart
